# -*- coding: utf-8 -*-
from odoo import http

# class ShowTreeViewColumns(http.Controller):
#     @http.route('/show_tree_view_columns/show_tree_view_columns/', auth='public')
#     def index(self, **kw):
#         return "Hello, world"

#     @http.route('/show_tree_view_columns/show_tree_view_columns/objects/', auth='public')
#     def list(self, **kw):
#         return http.request.render('show_tree_view_columns.listing', {
#             'root': '/show_tree_view_columns/show_tree_view_columns',
#             'objects': http.request.env['show_tree_view_columns.show_tree_view_columns'].search([]),
#         })

#     @http.route('/show_tree_view_columns/show_tree_view_columns/objects/<model("show_tree_view_columns.show_tree_view_columns"):obj>/', auth='public')
#     def object(self, obj, **kw):
#         return http.request.render('show_tree_view_columns.object', {
#             'object': obj
#         })