import _ from 'lodash';

export const prepareTreeData = (nodes) => {
    if (!nodes) return;
    _.forEach(nodes, function (item, key) {
        item.children = [];
        item.data["Level"] = 0;
    });
    // find the top level nodes and hash the nodes based on parent
    _.forEach(nodes, function (item, key) {
        if (key !== 'root') {
            var p = item.data.ParentId;
            if (p) {
                if (nodes[p]) {
                    nodes[p].children.push({ ElementId: item.data.ElementId })
                }
            } else {
                nodes["root"].children.push({ ElementId: item.data.ElementId })
            }
        }
    });
    return nodes;
};
