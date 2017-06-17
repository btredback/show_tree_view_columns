# -*- coding: utf-8 -*-

from odoo import models, fields, api
import logging

_logger = logging.getLogger(__name__)


class DynamicList(models.Model):
    _name = 'dynamic.list'

    name = fields.Char('model', required=True)
    user_id = fields.Integer('user_id', required=True)
    column_id = fields.Char('column', required=True)
    column_invisible = fields.Boolean('checked', required=True)

    @api.model
    def store_config_method(self):
        user_id = self.env.context['user_id']
        model_name = self.env.context['model_name']
        for item in self.env.context['columns_config']:
            column = self.search([('name', '=', model_name), ('user_id', '=', user_id), ('column_id', '=', item['id'])])
            if len(column) == 0:
                self.create({
                    'name': model_name,
                    'user_id': user_id,
                    'column_id': item['id'],
                    'column_invisible': item['invisible']
                })
            else:
                column.ensure_one()
                if column.column_invisible != item['invisible']:
                    # print 'write'
                    column.write({
                        'column_invisible': item['invisible']
                    })
        return {
            "result": u"success！"
        }