import loadComponents from './components';
import loadBlocks from './blocks';

export default grapesjs.plugins.add('grapesjs-tables', (editor, opts = {}) => {
  const options = { ...{

    tableBlock: {},

    tableProps: {
      rows: 3,
      columns: 3,
      header: true,
      footer: true
    },

    bodyProps: {},

    headBlock: {},

    headProps: {},

    footerBlock: {},

    footerProps: {},

    rowBlock: {},

    cellBlock: {},

  },  ...opts };

  // Add components
  loadComponents(editor, options);

  // Add blocks
  loadBlocks(editor, options);
});
