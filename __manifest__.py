# -*- coding: utf-8 -*-
{
    'name': "show_tree_view_columns",

    'summary': """
        show/invisible columns for tree view in list view buttons bar""",

    'description': """
        show/invisible columns for tree view in list view buttons bar.
        save user columns config and show them in next load.
    """,

    'author': "bt",
    'website': "",

    # Categories can be used to filter modules in modules listing
    # Check https://github.com/odoo/odoo/blob/master/odoo/addons/base/module/module_data.xml
    # for the full list
    'category': 'Uncategorized',
    'version': '1.1',

    # any module necessary for this one to work correctly
    'depends': ['base'],

    # always loaded
    'data': [
        # 'security/ir.model.access.csv',
        'views/views.xml',
        'views/templates.xml',
    ],
    # only loaded in demonstration mode
    'demo': [
        'demo/demo.xml',
    ],
    'qweb': [
        "static/src/xml/*.xml",
    ],
    'installable': True,
    'application': True,
    'auto_install': False,
}