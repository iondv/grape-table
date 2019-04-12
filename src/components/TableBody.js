export default (comps, config) => {
  const type = 'tbody';
  const attrKey = 'data-tbody';
  const classKey = 'table-body';
  const originalTable = comps.getType('tbody');
  const tableModel = originalTable.model;
  const tableView = originalTable.view;

  comps.addType(type, {
    model: tableModel.extend({
      defaults: {
        ...tableModel.prototype.defaults
      },
      init() {
        const attrs = this.getAttributes();
        attrs[attrKey] = 1;
        this.setAttributes(attrs);
        classKey && this.addClass(classKey);
      }
    }, {
      isComponent(el) {
        if (el.hasAttribute && el.hasAttribute(attrKey)) {
          return { type };
        }
      },
    }),
    view: tableView.extend({})
  });
}
