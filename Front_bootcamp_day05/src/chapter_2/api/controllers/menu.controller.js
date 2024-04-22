const { getAllMenuItems } = require('./menuitem.controller');

exports.getMenuPage = async (req, res) => {
    try {
        const menuItemsResult = await getAllMenuItems(req, res);
        if (!menuItemsResult.success) {
            return res.status(404).json({ menuItems: menuItemsResult });
        }
        const data = {
            title: 'Menu',
            menuItems: menuItemsResult.data.map((item) => item.toJSON()),
        };
        return res.render('menu', data);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to retrieve menu' });
    }
};
