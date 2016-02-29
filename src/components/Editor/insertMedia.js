import {List, Repeat} from 'immutable';
import {
  BlockMapBuilder,
  CharacterMetadata,
  ContentBlock,
  EditorState,
  Entity,
  Modifier,
  genKey,
} from 'draft-js';

// let count = 0;
// const examples = [
//   '\\int_a^bu\\frac{d^2v}{dx^2}\\,dx\n' +
//   '=\\left.u\\frac{dv}{dx}\\right|_a^b\n' +
//   '-\\int_a^b\\frac{du}{dx}\\frac{dv}{dx}\\,dx',
//
//   'P(E) = {n \\choose k} p^k (1-p)^{ n-k} ',
//
//   '\\tilde f(\\omega)=\\frac{1}{2\\pi}\n' +
//   '\\int_{-\\infty}^\\infty f(x)e^{-i\\omega x}\\,dx',
//
//   '\\frac{1}{(\\sqrt{\\phi \\sqrt{5}}-\\phi) e^{\\frac25 \\pi}} =\n' +
//   '1+\\frac{e^{-2\\pi}} {1+\\frac{e^{-4\\pi}} {1+\\frac{e^{-6\\pi}}\n' +
//   '{1+\\frac{e^{-8\\pi}} {1+\\ldots} } } }',
// ];

export function insertMedia(editorState) {
  const contentState = editorState.getCurrentContent();
  const selectionState = editorState.getSelection();

  const afterRemoval = Modifier.removeRange(
    contentState,
    selectionState,
    'backward'
  );

  const targetSelection = afterRemoval.getSelectionAfter();
  const afterSplit = Modifier.splitBlock(afterRemoval, targetSelection);
  const insertionTarget = afterSplit.getSelectionAfter();

  const asMedia = Modifier.setBlockType(afterSplit, insertionTarget, 'com.typhonapp.image');
  // const nextFormula = count++ % examples.length;

  const entityKey = Entity.create(
    'TOKEN',
    'IMMUTABLE',
    {content: null}
  );

  const charData = CharacterMetadata.create({entity: entityKey});

  const fragmentArray = [
    new ContentBlock({
      key: genKey(),
      type: 'com.typhonapp.image',
      text: ' ',
      characterList: List(Repeat(charData, 1)), /* eslint new-cap: [2, {"capIsNewExceptions": ["List", "Repeat"]}] */
    }),
    new ContentBlock({
      key: genKey(),
      type: 'unstyled',
      text: '',
      characterList: List(),
    }),
    new ContentBlock({
      key: genKey(),
      type: 'text',
      text: ' ',
    }),
  ];

  const fragment = BlockMapBuilder.createFromArray(fragmentArray);

  const withMedia = Modifier.replaceWithFragment(
    asMedia,
    insertionTarget,
    fragment
  );

  const newContent = withMedia.merge({
    selectionBefore: selectionState,
    selectionAfter: withMedia.getSelectionAfter().set('hasFocus', true),
  });

  return EditorState.push(editorState, newContent, 'insert-fragment');
}
