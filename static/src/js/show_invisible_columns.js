odoo.define('show_tree_view_columns.show_invisible_columns', function (require) {
"use strict";

var core = require('web.core');
var ListView = require('web.ListView');
var QWeb = core.qweb;
var session = require('web.session');
var Model = require('web.Model');
var data = require('web.data');

ListView.include({
    init: function () {
        var self = this;
        this._super.apply(this, arguments);
        this.save_columns = self.get_save_columns();
    },

    reload: function () {
       this.setup_columns(this.fields_view.fields, this.grouped);
       this.$el.html(QWeb.render(this._template, this));
       return this.reload_content();
    },

    render_buttons: function($node) {
        var self = this;
        this._super($node);
        this.$buttons.find('.oe_select_columns').click(this.proxy('my_setup_columns'));
        this.$buttons.find('.oe_dropdown_btn').click(this.proxy('hide_show_columns'));
        this.$buttons.find('.oe_dropdown_menu').click(this.proxy('stop_event'));
        this.$buttons.find('#getAll').click(this.proxy('select_all'));
        //DONE 保存按钮，将当前的checkbox内容及model，user信息保存到数据库
        this.$buttons.find('#save').click(this.proxy('save_columns_config'));
    },

    my_setup_columns: function (fields, grouped) {
        var self = this;
        //DONE 获取数据库中存储的个人列信息，并组合为{id:invisible}的json
        //console.log("----------------my_setup_columns----------------");
        $("#showcb").show();
        var getcb = document.getElementById('showcb');
        this.visible_columns = _.filter(this.columns, function (column) {
                var firstcheck = document.getElementById(column.id);
                if(firstcheck == null)
                {
                    //console.log("-----------------firstcheck-------------");
                    self.save_columns.then(function (results) {
                        if(results[column.id]){
                            column.invisible = '2';
                        }else if(typeof(results[column.id]) != 'undefined'){
                            column.invisible = '1';
                        }
                    });
                    var li= document.createElement("li");
                    var description = document.createTextNode(column.string);
                    var checkbox = document.createElement("input");
                    var span = document.createElement("span");
                    var label = document.createElement("label");
                    label.className = "o_switch";
                    checkbox.id = column.id;
                    checkbox.type = "checkbox";
                    checkbox.name = "cb";
                    if(column.invisible !== '1')
                    {
                        checkbox.checked = true;
                    }

                    li.appendChild(label);
                    label.appendChild(checkbox);
                    label.appendChild(span);
                    label.appendChild(description);
                    getcb.appendChild(li);
                    $("#" + column.id).click(function () {
                        //alert("test" + column.id + column.invisible)
                        self.immediately_show_columns();
                    });
                }
                else
                {
                    if(column.invisible !== '1')
                    {
                     firstcheck.checked = true;
                    }
                    else
                    {
                      firstcheck.checked = false;
                    }
                }
        });
    },
    stop_event : function(e)
      {
          e.stopPropagation();
      },

    hide_show_columns : function()
    {
       $("#showcb").hide();
       this.setup_columns(this.fields_view.fields, this.grouped);
       this.$el.html(QWeb.render(this._template, this));
       return this.reload_content();
    },

    immediately_show_columns : function()
    {
       this.setup_columns(this.fields_view.fields, this.grouped);
       this.$el.html(QWeb.render(this._template, this));
       return this.reload_content();
    },

    select_all : function () {
        var firstcheck = document.getElementById("getAll");
        if(firstcheck.checked == true){
            $.each($("input[name='cb']"), function () {
                if(this.checked == false){
                    this.checked = true
                }
            })
        }else {
            $.each($("input[name='cb']"), function () {
                if(this.checked == true){
                    this.checked = false
                }
            })
        }
    },

    setup_columns: function (fields, grouped) {
        this._super(fields, grouped);
        var self = this;
        var save_columns_cfg = self.save_columns.then(function (results) {
            self.visible_columns = _.filter(self.columns, function (column) {
            var cbid = document.getElementById(column.id);
            if(cbid !== null)
            {
              var cbid = cbid.checked;
              if(cbid && cbid !== false)
                {
                    column.invisible = '2';
                }
                else
                {
                    column.invisible = '1';
                }
            }else {
                //console.log("-----------------cbid null-------------");
                if(results[column.id]){
                    column.invisible = '2';
                }else if(typeof(results[column.id]) != 'undefined'){
                    column.invisible = '1';
                }
            }
              return column.invisible !== '1';
            });
            self.aggregate_columns = _(self.visible_columns).invoke('to_aggregate');
        });
    },
    save_columns_config: function () {
        var self = this;
        //console.log('-------------save_columns_config--------------');
        //DONE 获取当前的columns信息
        var columns_config = [];
        $.each($("input[name='cb']"), function () {
            var item = {
                'id': this.id,
                'invisible': this.checked
            };
            columns_config.push(item)
        });
        var dynamic_list = new Model('dynamic.list');
        var context = {
            'user_id': session.uid,
            'model_name': self.dataset.model,
            'columns_config': columns_config
        };
        dynamic_list.call("store_config_method",{context: new data.CompoundContext(context)})
            .then(function (result) {
                alert(result["result"]);
            });
    },
    get_save_columns: function () {
        var self = this;
        //DONE 获取数据库中存储的个人列信息，并组合为{id:invisible}的json
        var save_columns = {};
        var filterVal = [
            ['name', '=', self.dataset.model],
            ['user_id', '=', session.uid]
        ];
        var dynamic_list = new Model('dynamic.list');
        return dynamic_list.query(['column_id', 'column_invisible']).filter(filterVal).all()
                .then(function (results) {
                    if(results.length > 0){
                        _(results).each(function (item) {
                            save_columns[item.column_id] = item.column_invisible;
                        });
                    }
                    return save_columns
                })
    }
});

$(document).click(function(){
  $("#showcb").hide();
});

});
