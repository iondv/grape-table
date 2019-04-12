export default (comps, config) => {
  const type = 'tfoot';
  const attrKey = 'data-tfoot';
  const classKey = 'table-footer';
  const originalTable = comps.getType('tfoot');
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
