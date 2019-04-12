export default (editor, config = {}) => {
  const bm = editor.BlockManager;
  const { tableBlock } = config;

  tableBlock && bm.add('table', {
    label: 'Таблица',
    attributes: {class: 'fa fa-columns'},
    category: 'Таблицы',
    content: {
      type: 'table',
      style: {
        width: '100%'
      },
      activeOnRender: true
    },
    ...tableBlock
  });

}
