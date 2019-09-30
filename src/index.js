import uuidv4 from "uuid/v4";
import './main.scss';

(function(){
    const utils = {
        make_element: function (type = "div", children, options = {}) {
            let el = document.createElement(type);
            const {
                attributes,
                classes,
                handlers
            } = options;
            if (classes) {
                el = utils.add_classes(el, classes);
            };
            if (attributes) {
                el = utils.add_attributes(el, attributes);
            };
            if (handlers) {
                el = utils.add_handlers(el, handlers);
            };
            if (typeof children === "string") {
                el.innerHTML = children;
            } else if (typeof children === "object") {
                el.appendChild(children);
            };
            return el;
        },
        add_classes: function (element, class_str) {
            const new_element = element.cloneNode();
            const class_arr = class_str.split(" ");
            class_arr.forEach((class_item) => new_element.classList.add(class_item));
            return new_element;
        },
        add_attributes: function (element, attributes) {
            const new_element = element.cloneNode();
            const keys = Object.keys(attributes);
            keys.forEach((key) => new_element.setAttribute(key, attributes[key]));
            return new_element;
        },
        add_handlers: function (element, handlers) {
            const new_element = element.cloneNode();
            const keys = Object.keys(handlers);
            keys.forEach((key) => new_element.addEventListener(key, handlers[key]));
            return new_element;
        },
        mount_node: function (node, mount_point, options = {}) {
            if (!node || !mount_point) {
                return;
            };
            const {
                top
            } = options;
            if (top) {
                if (mount_point && mount_point.firstChild) {
                    return mount_point.insertBefore(node, mount_point.firstChild);
                }
            }
            return mount_point.appendChild(node);
        }
    };
    const tn_guid = {

        // App State

        state: {
            uuid_list: []
        },

        // DOM references

        refs: {},

        // Methods

        get_references: function () {
            tn_guid.refs.create_button = document.querySelector(".js-create-uuid");
            tn_guid.refs.output = document.querySelector(".js-uuid-output");
        },
        make_uuid: function () {
            tn_guid.uuid_list.push(uuidv4());
        },

        // Components

        app_container: function () {
            return `
                <div class="app-uuid-wrapper">
                <h1>UUID Generator</h1>
                    <div class="js-uuid-output uuid-output"></div>
                </div>
            `;
        },
        create_button: function () {
            const button =  utils.make_element(
                "button",
                "Click to Create UUID",
                {
                    classes: "js-uuid-create btn",
                    handlers: {
                        click: tn_guid.handle_create
                    }
                }
            );
            return button;
        },

        // Handlers

        handle_create: function (event) {
            const uuid = uuidv4();
            tn_guid.state.uuid_list.push(uuid);
            const item = utils.make_element(
                "div",
                uuid,
                {
                    attributes: {
                        style: "font-weight: bold; margin: 1rem 0;"
                    }
                }
            );
            utils.mount_node(
                item,
                tn_guid.refs.output,
                {
                    top: true
                }
            );
        }
    };

    function init () {
        const root = document.querySelector(".app-root");
        root.innerHTML = tn_guid.app_container();
        tn_guid.get_references();
        const button = tn_guid.create_button();
        tn_guid.refs.output.parentNode.insertBefore(button, tn_guid.refs.output);
    }
    window.addEventListener("load", init);
}());
