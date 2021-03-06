export default (comps, {modal, ...config}) => {
  const type = 'table';
  const attrKey = 'data-table';
  const classKey = 'table-component';
  const originalTable = comps.getType('table');
  const tableModel = originalTable.model;
  const tableView = originalTable.view;
  const tableProps = config.tableProps || {};

  const rows = tableProps.rows || 2;
  const columns = tableProps.columns || 2;

  const components = [];

  components.push({type: 'tbody', rows, columns});

  comps.addType(type, {
    model: tableModel.extend({
      defaults: {
        ...tableModel.prototype.defaults,

        traits: [
          {
            type: 'number',
            label: 'Строк',
            name: 'rows',
            changeProp: 1
          },
          {
            type: 'number',
            label: 'Столбцов',
            name: 'columns',
            changeProp: 1
          }
        ],

        rows,

        columns,

        components
      },
      init() {
        const attrs = this.getAttributes();
        attrs[attrKey] = 1;
        this.setAttributes(attrs);
        classKey && this.addClass(classKey);
        this.listenTo(this, 'change:rows', this.changeDimensions);
        this.listenTo(this, 'change:columns', this.changeDimensions);
      },
      changeDimensions() {
        const addRows = this.get('rows');
        const addColumns = this.get('columns');
        this.components([{type: 'tbody', rows: addRows, columns: addColumns}]);
      }
    }, {
      isComponent(el) {
        if (el.hasAttribute && el.hasAttribute(attrKey)) {
          return { type };
        }
      },
    }),
    view: tableView.extend({
      init() {
        this.listenTo(this.model, 'active', this.openModal);
      },
      openModal() {

        let setRows = rows;
        let setColumns = columns;

        const divContainer = document.createElement('div');

        const containerRows = document.createElement('div');

        const labelRows = document.createElement('label');
        labelRows.innerHTML = 'Строк&nbsp;';
        containerRows.appendChild(labelRows);

        const inputRows = document.createElement('input');
        inputRows.setAttribute('type', 'number');
        inputRows.setAttribute('value', setRows);
        inputRows.onchange = () => {
          setRows = inputRows.value;
        };
        containerRows.appendChild(inputRows);
        divContainer.appendChild(containerRows);

        const containerColumns = document.createElement('div');

        const labelColumns = document.createElement('label');
        labelColumns.innerHTML = 'Столбцов&nbsp;';
        containerColumns.appendChild(labelColumns);

        const inputColumns = document.createElement('input');
        inputColumns.setAttribute('type', 'number');
        inputColumns.setAttribute('value', setColumns);
        inputColumns.onchange = () => {
          setColumns = inputColumns.value;
        };
        containerColumns.appendChild(inputColumns);
        divContainer.appendChild(containerColumns);

        const containerBtn = document.createElement('div');
        const btn = document.createElement('button');
        btn.innerHTML = 'Создать';
        btn.onclick = () => {
          this.model.set('rows', setRows);
          this.model.set('columns', setColumns);
          modal.close();
        };
        containerBtn.appendChild(btn);
        divContainer.appendChild(containerBtn);

        modal
          .setTitle('Новая таблица')
          .setContent(divContainer)
          .open();
      }
    })
  });
}
