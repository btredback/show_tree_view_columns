# show/invisible columns for list view

- odoo 10.0 addon

  odoo 10 动态列表

- show/invisible columns for list view to use select columns button, select checkbox immediately to show/invisible.

  列表内容左上角增加选择列功能，默认按xml中配置第一次显示内容，可根据勾选的列动态更改列表列内容。

- use save button can save current select columns and user and model config. after next load list, it can use config that save in db.if first load list or not save,it use list view in odoo xml define.

  可使用save按钮，保存当前用户的列表配置信息。再次进入列表，会以数据库中存储的用户列表配置来显示列内容，而不再是xml配置的统一默认列表内容。

- update: modify checkbox display

  更新：修改checkbox样式

  ​

  ​

  ## Example

  ![like this](https://github.com/btredback/show_tree_view_columns/blob/master/static/descript/select%20columns.png?raw=true)