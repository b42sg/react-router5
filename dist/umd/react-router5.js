(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react')) :
    typeof define === 'function' && define.amd ? define('reactRouter5', ['exports', 'react'], factory) :
    (factory((global.reactRouter5 = {}),global.React));
}(this, function (exports,React) { 'use strict';

    var React__default = 'default' in React ? React['default'] : React;

    var babelHelpers = {};

    babelHelpers.classCallCheck = function (instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    };

    babelHelpers.createClass = function () {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor) descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }

      return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
      };
    }();

    babelHelpers.extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    babelHelpers.inherits = function (subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
      }

      subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
          value: subClass,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    };

    babelHelpers.possibleConstructorReturn = function (self, call) {
      if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }

      return call && (typeof call === "object" || typeof call === "function") ? call : self;
    };

    babelHelpers;

    var ifNot = function ifNot(condition, errorMessage) {
        if (!ifNot) throw new Error(errorMessage);
    };

    function withRoute(BaseComponent) {
        var ComponentWithRoute = function (_Component) {
            babelHelpers.inherits(ComponentWithRoute, _Component);

            function ComponentWithRoute(props, context) {
                babelHelpers.classCallCheck(this, ComponentWithRoute);

                var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(ComponentWithRoute).call(this, props, context));

                _this.router = context.router;
                _this.state = {
                    previousRoute: null,
                    route: _this.router.getState()
                };
                return _this;
            }

            babelHelpers.createClass(ComponentWithRoute, [{
                key: 'componentDidMount',
                value: function componentDidMount() {
                    var _this2 = this;

                    ifNot(this.router.registeredPlugins.LISTENERS, '[react-router5] missing plugin router5-listeners.');

                    this.listener = function (toState, fromState) {
                        return _this2.setState({ previousRoute: fromState, route: toState });
                    };
                    this.router.addListener(this.nodeListener);
                }
            }, {
                key: 'componentWillUnmout',
                value: function componentWillUnmout() {
                    this.router.removeListener(this.listener);
                }
            }, {
                key: 'render',
                value: function render() {
                    ifNot(!props.router && !props.route && !props.previousRoute, '[react-router5] prop names `router`, `route` and `previousRoute` are reserved.');

                    return React.createElement(BaseComponent, babelHelpers.extends({}, props, this.state, { router: this.router }));
                }
            }]);
            return ComponentWithRoute;
        }(React.Component);

        return ComponentWithRoute;
    }

    var BaseLink = function (_Component) {
        babelHelpers.inherits(BaseLink, _Component);

        function BaseLink(props, context) {
            babelHelpers.classCallCheck(this, BaseLink);

            var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(BaseLink).call(this, props, context));

            _this.isActive = _this.isActive.bind(_this);
            _this.clickHandler = _this.clickHandler.bind(_this);
            _this.routeChangeHandler = _this.routeChangeHandler.bind(_this);

            _this.state = { active: _this.isActive() };
            return _this;
        }

        babelHelpers.createClass(BaseLink, [{
            key: 'isActive',
            value: function isActive() {
                return this.props.router.isActive(this.props.routeName, this.props.routeParams);
            }
        }, {
            key: 'clickHandler',
            value: function clickHandler(evt) {
                if (this.props.onClick) {
                    this.props.onClick(evt);

                    if (evt.defaultPrevented) {
                        return;
                    }
                }

                var comboKey = event.metaKey || event.altKey || event.ctrlKey || event.shiftKey;

                if (evt.button === 0 && !comboKey) {
                    evt.preventDefault();
                    this.props.router.navigate(this.props.routeName, this.props.routeParams, this.props.routeOptions);
                }
            }
        }, {
            key: 'render',
            value: function render() {
                var _props = this.props;
                var router = _props.router;
                var routeName = _props.routeName;
                var routeParams = _props.routeParams;
                var className = _props.className;
                var activeClassName = _props.activeClassName;
                var children = _props.children;

                var active = this.isActive();
                var href = router.buildUrl(routeName, routeParams);
                var linkclassName = (className ? className.split(' ') : []).concat(active ? [activeClassName] : []).join(' ');

                var onClick = this.clickHandler;

                return React__default.createElement('a', { href: href, className: linkclassName, onClick: onClick }, children);
            }
        }]);
        return BaseLink;
    }(React.Component);

    Link.propTypes = {
        // route:           PropTypes.object.isRequired,
        router: React.PropTypes.object.isRequired,
        routeName: React.PropTypes.string.isRequired,
        routeParams: React.PropTypes.object,
        routeOptions: React.PropTypes.object,
        activeClassName: React.PropTypes.string,
        activeStrict: React.PropTypes.bool,
        onClick: React.PropTypes.func
    };

    Link.defaultProps = {
        activeClassName: 'active',
        activeStrict: false,
        routeParams: {},
        routeOptions: {}
    };

    var RouterProvider = function (_Component) {
        babelHelpers.inherits(RouterProvider, _Component);

        function RouterProvider(props, context) {
            babelHelpers.classCallCheck(this, RouterProvider);

            var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(RouterProvider).call(this, props, context));

            _this.router = props.router;
            return _this;
        }

        babelHelpers.createClass(RouterProvider, [{
            key: 'getChildContext',
            value: function getChildContext() {
                return { router: this.router };
            }
        }, {
            key: 'componentWillReceiveProps',
            value: function componentWillReceiveProps(nextProps) {
                if (this.props.router !== nextProps.router) {
                    console.error('[react-router5][Router]does not support changing the router object.');
                }
            }
        }, {
            key: 'render',
            value: function render() {
                var children = this.props.children;

                return React.Children.only(children);
            }
        }]);
        return RouterProvider;
    }(React.Component);

    RouterProvider.propTypes = {
        router: React.PropTypes.object.isRequired,
        children: React.PropTypes.element.isRequired
    };

    RouterProvider.childContextTypes = {
        router: React.PropTypes.object.isRequired
    };

    function getDisplayName(component) {
        return component.displayName || component.name || 'Component';
    }

    function routeNode(nodeName) {
        var register = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

        return function routeNodeWrapper(RouteSegment) {
            var RouteNode = function (_Component) {
                babelHelpers.inherits(RouteNode, _Component);

                function RouteNode(props, context) {
                    babelHelpers.classCallCheck(this, RouteNode);

                    var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(RouteNode).call(this, props, context));

                    _this.router = context.router;
                    _this.state = {
                        previousRoute: null,
                        route: _this.router.getState()
                    };
                    return _this;
                }

                babelHelpers.createClass(RouteNode, [{
                    key: 'componentDidMount',
                    value: function componentDidMount() {
                        var _this2 = this;

                        if (register) this.router.registerComponent(nodeName, this.refs.wrappedInstance);

                        if (!this.router.registeredPlugins.LISTENERS) {
                            throw new Error('[react-router5][RouteNode] missing plugin router5-listeners.');
                        }

                        this.nodeListener = function (toState, fromState) {
                            return _this2.setState({ previousRoute: fromState, route: toState });
                        };
                        this.router.addNodeListener(nodeName, this.nodeListener);
                    }
                }, {
                    key: 'componentWillUnmout',
                    value: function componentWillUnmout() {
                        this.router.removeNodeListener(nodeName, this.nodeListener);
                    }
                }, {
                    key: 'render',
                    value: function render() {
                        var props = this.props;
                        var _state = this.state;
                        var previousRoute = _state.previousRoute;
                        var route = _state.route;

                        var component = React__default.createElement(RouteSegment, babelHelpers.extends({}, props, { previousRoute: previousRoute, route: route, ref: register ? 'wrappedInstance' : undefined }));

                        return component;
                    }
                }]);
                return RouteNode;
            }(React.Component);

            RouteNode.contextTypes = {
                router: React.PropTypes.object.isRequired
            };

            RouteNode.displayName = 'RouteNode[' + getDisplayName(RouteSegment) + ']';

            return RouteNode;
        };
    }

    var Link$1 = withRoute(BaseLink);

    exports.BaseLink = BaseLink;
    exports.routeNode = routeNode;
    exports.RouterProvider = RouterProvider;
    exports.withRoute = withRoute;
    exports.Link = Link$1;

}));