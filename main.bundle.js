webpackJsonp([1,4],{

/***/ 137:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConstituentComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ConstituentComponent = (function () {
    function ConstituentComponent() {
    }
    ConstituentComponent.prototype.ngOnInit = function () {
        console.log('loading constituent');
    };
    return ConstituentComponent;
}());
ConstituentComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-constituent',
        template: __webpack_require__(325),
        styles: [__webpack_require__(313)]
    }),
    __metadata("design:paramtypes", [])
], ConstituentComponent);

//# sourceMappingURL=constituent.component.js.map

/***/ }),

/***/ 138:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ng_idle_core__ = __webpack_require__(129);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_idle_state_model__ = __webpack_require__(246);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__logging_log_service__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__session_service__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__environment_service__ = __webpack_require__(40);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IdleService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/** Service used to monitor user activity, warn user when inactive,
 * and log user out when activity limit reached
 */
var IdleService = (function () {
    function IdleService(idle, logService, sessionService, environmentService) {
        var _this = this;
        this.idle = idle;
        this.logService = logService;
        this.sessionService = sessionService;
        this.environmentService = environmentService;
        this.idleState = new __WEBPACK_IMPORTED_MODULE_2__models_idle_state_model__["a" /* IdleState */];
        // sets an idle timeout in seconds
        this.setIdle(environmentService.idleSeconds);
        // sets a timeout warning period of seconds.
        this.setTimeout(environmentService.idleCountdownSeconds);
        // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
        idle.setInterrupts(__WEBPACK_IMPORTED_MODULE_1__ng_idle_core__["b" /* DEFAULT_INTERRUPTSOURCES */]);
        idle.onIdleEnd.subscribe(function () { return _this.idleState.state = __WEBPACK_IMPORTED_MODULE_2__models_idle_state_model__["b" /* IdleStateEnum */].Active; });
        idle.onTimeout.subscribe(function () {
            _this.idleState.state = __WEBPACK_IMPORTED_MODULE_2__models_idle_state_model__["b" /* IdleStateEnum */].TimedOut;
            _this.idleState.timedOut = true;
            logService.warn(_this.idleState.state);
            sessionService.logout();
        });
        idle.onIdleStart.subscribe(function () {
            _this.idleState.state = __WEBPACK_IMPORTED_MODULE_2__models_idle_state_model__["b" /* IdleStateEnum */].Idle;
            logService.warn(_this.idleState.state);
        });
        idle.onTimeoutWarning.subscribe(function (countdown) {
            // TODO: put up angular warning screen for timeout
            _this.idleState.state = 'You will time out in ' + countdown + ' seconds!';
            logService.log(_this.idleState.state);
        });
    }
    /** sets Idle length of time in seconds to wait for inactivity before warning user
     * @param seconds - number of seconds
    */
    IdleService.prototype.setIdle = function (seconds) {
        this.idle.setIdle(seconds);
        this.logService.log('IdleService.setIdle:' + seconds);
    };
    /** set length of time in seconds user has to do something before getting logged out
     * @param seconds - number of seconds
     */
    IdleService.prototype.setTimeout = function (seconds) {
        this.idle.setTimeout(seconds);
        this.logService.log('IdleService.setTimeout:' + seconds);
    };
    /** enables/resets the idle watcher to start checking for user inactivity
     */
    IdleService.prototype.reset = function () {
        this.idle.watch();
        this.idleState.state = __WEBPACK_IMPORTED_MODULE_2__models_idle_state_model__["b" /* IdleStateEnum */].Started;
        this.idleState.timedOut = false;
    };
    /** stops the idle watcher */
    IdleService.prototype.stop = function () {
        this.idleState.state = __WEBPACK_IMPORTED_MODULE_2__models_idle_state_model__["b" /* IdleStateEnum */].Stopped;
        this.idleState.timedOut = true;
    };
    return IdleService;
}());
IdleService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__ng_idle_core__["c" /* Idle */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__ng_idle_core__["c" /* Idle */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__logging_log_service__["a" /* LogService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__logging_log_service__["a" /* LogService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__session_service__["a" /* SessionService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__session_service__["a" /* SessionService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_5__environment_service__["a" /* EnvironmentService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__environment_service__["a" /* EnvironmentService */]) === "function" && _d || Object])
], IdleService);

var _a, _b, _c, _d;
//# sourceMappingURL=idle.service.js.map

/***/ }),

/***/ 139:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = RouteUrlHome;
/* harmony export (immutable) */ __webpack_exports__["a"] = RouteUrlConstituent;
function RouteUrlHome() {
    return 'home';
}
function RouteUrlConstituent() {
    return 'constituent';
}
//# sourceMappingURL=dashboard-routing.urls.js.map

/***/ }),

/***/ 140:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var HomeComponent = (function () {
    function HomeComponent() {
        this.title = 'app works!';
        this.invert = false;
        this.selected = '';
    }
    HomeComponent.prototype.ngOnInit = function () {
    };
    HomeComponent.prototype.logout = function () {
    };
    return HomeComponent;
}());
HomeComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-home',
        template: __webpack_require__(327),
        styles: [__webpack_require__(315)]
    }),
    __metadata("design:paramtypes", [])
], HomeComponent);

//# sourceMappingURL=home.component.js.map

/***/ }),

/***/ 141:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_material__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConstituentSearchComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ConstituentSearchComponent = (function () {
    function ConstituentSearchComponent(dialogRef) {
        this.dialogRef = dialogRef;
    }
    return ConstituentSearchComponent;
}());
ConstituentSearchComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        selector: 'app-constituent-search',
        template: __webpack_require__(329),
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_material__["e" /* MdDialogRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_material__["e" /* MdDialogRef */]) === "function" && _a || Object])
], ConstituentSearchComponent);

var _a;
//# sourceMappingURL=constituent-search.component.js.map

/***/ }),

/***/ 142:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constituent_search_component__ = __webpack_require__(141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_material__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConstituentSearchService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ConstituentSearchService = (function () {
    function ConstituentSearchService(dialog) {
        this.dialog = dialog;
    }
    // note: can pass in arguments here, like title: string
    ConstituentSearchService.prototype.search = function () {
        var dialogRef;
        dialogRef = this.dialog.open(__WEBPACK_IMPORTED_MODULE_0__constituent_search_component__["a" /* ConstituentSearchComponent */]);
        // if you needed to set variable on the component
        // dialogRef.componentInstance.title = title;
        return dialogRef.afterClosed();
    };
    return ConstituentSearchService;
}());
ConstituentSearchService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_material__["d" /* MdDialog */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_material__["d" /* MdDialog */]) === "function" && _a || Object])
], ConstituentSearchService);

var _a;
//# sourceMappingURL=constituent-search.service.js.map

/***/ }),

/***/ 143:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_material__ = __webpack_require__(27);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CustomMaterialModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


// import { MdMenuTrigger } from '@angular/material';
var CustomMaterialModule = (function () {
    function CustomMaterialModule() {
    }
    return CustomMaterialModule;
}());
CustomMaterialModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_material__["a" /* MaterialModule */],
            __WEBPACK_IMPORTED_MODULE_1__angular_material__["f" /* MdButtonModule */],
            __WEBPACK_IMPORTED_MODULE_1__angular_material__["g" /* MdMenuModule */],
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_material__["a" /* MaterialModule */],
            __WEBPACK_IMPORTED_MODULE_1__angular_material__["f" /* MdButtonModule */],
            __WEBPACK_IMPORTED_MODULE_1__angular_material__["g" /* MdMenuModule */],
        ],
        declarations: []
    })
], CustomMaterialModule);

//# sourceMappingURL=custom-material.module.js.map

/***/ }),

/***/ 144:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__core_auth_auth_service__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__core_logging_log_service__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_routing_urls__ = __webpack_require__(58);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




;


/** LoginComponent handles login functionality for application */
var LoginComponent = (function () {
    function LoginComponent(route, authService, router, logService) {
        this.route = route;
        this.authService = authService;
        this.router = router;
        this.logService = logService;
        this.username = '';
        this.password = '';
    }
    /** sets returnUrl to navigate to after login is successful */
    LoginComponent.prototype.ngOnInit = function () {
        // reset login status
        // TODO: replace calls to authService.logout to instead navigate to login?
        this.authService.logout();
        // get return url from route parameters or default to 'deshboard'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__app_routing_urls__["b" /* RouteUrlDashboard */])();
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        console.log('LoginComponent login starting');
        this.authService.login(this.username, this.password)
            .then(function (response) {
            console.log('LoginComponent login navigateToUrl');
            _this.navigateToUrl();
        })
            .catch(function (err) {
            console.log('LoginComponent login call error ', err);
            // this.handleError('Login Failed');
        });
        console.log('LoginComponent login exiting');
    };
    LoginComponent.prototype.navigateToUrl = function () {
        this.router.navigate([this.returnUrl]);
    };
    LoginComponent.prototype.handleError = function (err) {
        // TODO: display error to user in view
        this.logService.error(err);
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-login',
        template: __webpack_require__(330),
        styles: [__webpack_require__(317)],
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* ActivatedRoute */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__core_auth_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__core_auth_auth_service__["a" /* AuthService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__core_logging_log_service__["a" /* LogService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__core_logging_log_service__["a" /* LogService */]) === "function" && _d || Object])
], LoginComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=login.component.js.map

/***/ }),

/***/ 145:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_material__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MessageBoxComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var MessageBoxComponent = (function () {
    function MessageBoxComponent(dialogRef) {
        this.dialogRef = dialogRef;
    }
    return MessageBoxComponent;
}());
MessageBoxComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        selector: 'app-message-box',
        template: __webpack_require__(331),
        styles: [__webpack_require__(318)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_material__["e" /* MdDialogRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_material__["e" /* MdDialogRef */]) === "function" && _a || Object])
], MessageBoxComponent);

var _a;
//# sourceMappingURL=message-box.component.js.map

/***/ }),

/***/ 146:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false,
    idleSeconds: 600,
    idleCountdownSeconds: 10,
    hmr: true,
    apiBaseUrl: 'https://localhost:44358/',
    idServer: 'https://localhost:44343/identity/'
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ 210:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "mountains.d4d6d0d5647b7e8c854f.jpg";

/***/ }),

/***/ 211:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 211;


/***/ }),

/***/ 212:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(233);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__(241);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(146);




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["enableProdMode"])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 239:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_login_login_component__ = __webpack_require__(144);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__dashboard_dashboard_component__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__core_auth_auth_guard_service__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_routing_urls__ = __webpack_require__(58);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppRoutingModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    return AppRoutingModule;
}());
AppRoutingModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* RouterModule */].forRoot([
                { path: '', redirectTo: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__app_routing_urls__["a" /* RouteUrlLogin */])(), pathMatch: 'full' },
                { path: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__app_routing_urls__["a" /* RouteUrlLogin */])(), component: __WEBPACK_IMPORTED_MODULE_2__shared_login_login_component__["a" /* LoginComponent */] },
                { path: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__app_routing_urls__["b" /* RouteUrlDashboard */])(), component: __WEBPACK_IMPORTED_MODULE_3__dashboard_dashboard_component__["a" /* DashboardComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_4__core_auth_auth_guard_service__["a" /* AuthGuardService */]] },
                { path: '**', redirectTo: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__app_routing_urls__["a" /* RouteUrlLogin */])() }
            ])
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* RouterModule */]
        ]
    })
], AppRoutingModule);

//# sourceMappingURL=app-routing.module.js.map

/***/ }),

/***/ 240:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = (function () {
    function AppComponent() {
        this.title = 'Open Case Work';
    }
    return AppComponent;
}());
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-root',
        template: __webpack_require__(324),
        styles: [__webpack_require__(312)]
    })
], AppComponent);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 241:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_material__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_flex_layout__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser_animations__ = __webpack_require__(234);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_hammerjs__ = __webpack_require__(319);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_hammerjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_hammerjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_component__ = __webpack_require__(240);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__shared_login_login_module__ = __webpack_require__(251);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__core_core_module__ = __webpack_require__(244);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__app_routing_module__ = __webpack_require__(239);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__dashboard_dashboard_module__ = __webpack_require__(248);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};











var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* AppComponent */],
        ],
        // NOTE: the order of imported modules actually matters, especially for routing.
        // Modules with child router (Dashboard) need to be imported *before* the AppRoutingModule
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_material__["a" /* MaterialModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_flex_layout__["a" /* FlexLayoutModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
            __WEBPACK_IMPORTED_MODULE_10__dashboard_dashboard_module__["a" /* DashboardModule */],
            __WEBPACK_IMPORTED_MODULE_9__app_routing_module__["a" /* AppRoutingModule */],
            __WEBPACK_IMPORTED_MODULE_7__shared_login_login_module__["a" /* LoginModule */],
            __WEBPACK_IMPORTED_MODULE_8__core_core_module__["a" /* CoreModule */]
        ],
        providers: [],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 242:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__auth_service__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mock_auth_service__ = __webpack_require__(243);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular_oauth2_oidc__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular_oauth2_oidc___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_angular_oauth2_oidc__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environment_service__ = __webpack_require__(40);
/* unused harmony export authServiceFactory */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthServiceProvider; });




function authServiceFactory(environmentService, oAuthService) {
    if (environmentService.isProduction === false) {
        return new __WEBPACK_IMPORTED_MODULE_1__mock_auth_service__["a" /* MockAuthService */]();
    }
    else {
        return new __WEBPACK_IMPORTED_MODULE_0__auth_service__["a" /* AuthService */](environmentService, oAuthService);
    }
}
;
var AuthServiceProvider = {
    provide: __WEBPACK_IMPORTED_MODULE_0__auth_service__["a" /* AuthService */],
    useFactory: authServiceFactory,
    deps: [__WEBPACK_IMPORTED_MODULE_3__environment_service__["a" /* EnvironmentService */], __WEBPACK_IMPORTED_MODULE_2_angular_oauth2_oidc__["OAuthService"]]
};
//# sourceMappingURL=auth.service.provider.js.map

/***/ }),

/***/ 243:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MockAuthService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var MockAuthService = (function () {
    function MockAuthService() {
        this.loggedIn = false;
        console.log('i was called!');
    }
    MockAuthService.prototype.login = function (username, password) {
        var _this = this;
        this.loggedIn = true;
        console.log('mock service');
        return new Promise(function (resolve, reject) {
            console.log('before oauthService call');
            return resolve(_this.loggedIn);
        });
    };
    MockAuthService.prototype.isLoggedIn = function () { return true; };
    MockAuthService.prototype.logout = function () {
        console.log('i tried to log out');
    };
    return MockAuthService;
}());
MockAuthService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [])
], MockAuthService);

//# sourceMappingURL=mock.auth.service.js.map

/***/ }),

/***/ 244:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ng_idle_core__ = __webpack_require__(129);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular_oauth2_oidc__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular_oauth2_oidc___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_angular_oauth2_oidc__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__logging_log_service__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__environment_service__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__auth_auth_guard_service__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__auth_auth_service_provider__ = __webpack_require__(242);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__session_session_service__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__session_idle_service__ = __webpack_require__(138);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CoreModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};









var CoreModule = (function () {
    function CoreModule(parentModule) {
        if (parentModule) {
            throw new Error('CoreModule is already loaded. Import it in the AppModule only');
        }
    }
    return CoreModule;
}());
CoreModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_2_angular_oauth2_oidc__["OAuthModule"].forRoot(),
            __WEBPACK_IMPORTED_MODULE_1__ng_idle_core__["a" /* NgIdleModule */].forRoot()
        ],
        declarations: [],
        providers: [
            __WEBPACK_IMPORTED_MODULE_5__auth_auth_guard_service__["a" /* AuthGuardService */],
            __WEBPACK_IMPORTED_MODULE_6__auth_auth_service_provider__["a" /* AuthServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_3__logging_log_service__["a" /* LogService */],
            __WEBPACK_IMPORTED_MODULE_8__session_idle_service__["a" /* IdleService */],
            __WEBPACK_IMPORTED_MODULE_4__environment_service__["a" /* EnvironmentService */],
            __WEBPACK_IMPORTED_MODULE_7__session_session_service__["a" /* SessionService */]
        ],
        exports: []
    }),
    __param(0, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Optional"])()), __param(0, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["SkipSelf"])()),
    __metadata("design:paramtypes", [CoreModule])
], CoreModule);

//# sourceMappingURL=core.module.js.map

/***/ }),

/***/ 245:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Level; });
/**
* The available options to set the Level of the Logger.
* See {@link LogService}.
*/
/**
* The available options to set the Level of the Logger.
* See {@link LogService}.
*/ var Level;
(function (Level) {
    Level[Level["OFF"] = 0] = "OFF";
    Level[Level["ERROR"] = 1] = "ERROR";
    Level[Level["WARN"] = 2] = "WARN";
    Level[Level["INFO"] = 3] = "INFO";
    Level[Level["DEBUG"] = 4] = "DEBUG";
    Level[Level["LOG"] = 5] = "LOG";
})(Level || (Level = {}));
//# sourceMappingURL=level.js.map

/***/ }),

/***/ 246:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IdleState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return IdleStateEnum; });
var IdleState = (function () {
    function IdleState() {
        this.state = 'Not started.';
        this.timedOut = false;
        this.lastPing = null;
    }
    return IdleState;
}());

var IdleStateEnum = {
    Idle: 'IdleState.Idle',
    Active: 'IdleState.Active',
    Started: 'IdleState.Started',
    Stopped: 'IdleState.Stopped',
    TimedOut: 'IdleState.TimedOut'
};

//# sourceMappingURL=idle-state.model.js.map

/***/ }),

/***/ 247:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__dashboard_component__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_home_component__ = __webpack_require__(140);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__constituent_constituent_component__ = __webpack_require__(137);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__core_auth_auth_guard_service__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_routing_urls__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__dashboard_routing_urls__ = __webpack_require__(139);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DashboardRoutingModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








var dashboardRoutes = [
    {
        path: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__app_routing_urls__["b" /* RouteUrlDashboard */])(), canActivate: [__WEBPACK_IMPORTED_MODULE_5__core_auth_auth_guard_service__["a" /* AuthGuardService */]], component: __WEBPACK_IMPORTED_MODULE_2__dashboard_component__["a" /* DashboardComponent */],
        children: [
            { path: '', redirectTo: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__dashboard_routing_urls__["b" /* RouteUrlHome */])(), pathMatch: 'full' },
            { path: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__dashboard_routing_urls__["b" /* RouteUrlHome */])(), component: __WEBPACK_IMPORTED_MODULE_3__home_home_component__["a" /* HomeComponent */] },
            { path: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__dashboard_routing_urls__["a" /* RouteUrlConstituent */])(), component: __WEBPACK_IMPORTED_MODULE_4__constituent_constituent_component__["a" /* ConstituentComponent */] },
        ]
    }
];
var DashboardRoutingModule = (function () {
    function DashboardRoutingModule() {
    }
    return DashboardRoutingModule;
}());
DashboardRoutingModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* RouterModule */].forChild(dashboardRoutes)
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* RouterModule */]
        ]
    })
], DashboardRoutingModule);

//# sourceMappingURL=dashboard-routing.module.js.map

/***/ }),

/***/ 248:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__dashboard_routing_module__ = __webpack_require__(247);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_custom_material_module__ = __webpack_require__(143);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__constituent_constituent_component__ = __webpack_require__(137);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__home_home_component__ = __webpack_require__(140);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__dashboard_component__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__menu_dashboard_menu_component__ = __webpack_require__(249);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__shared_accounts_service__ = __webpack_require__(250);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__shared_shared_module__ = __webpack_require__(253);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__angular_flex_layout__ = __webpack_require__(76);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DashboardModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




// import { MaterialModule }         from '@angular/material';








var DashboardModule = (function () {
    function DashboardModule() {
    }
    return DashboardModule;
}());
DashboardModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_3__dashboard_routing_module__["a" /* DashboardRoutingModule */],
            __WEBPACK_IMPORTED_MODULE_4__shared_custom_material_module__["a" /* CustomMaterialModule */],
            __WEBPACK_IMPORTED_MODULE_10__shared_shared_module__["a" /* SharedModule */],
            __WEBPACK_IMPORTED_MODULE_11__angular_flex_layout__["a" /* FlexLayoutModule */]
        ],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_7__dashboard_component__["a" /* DashboardComponent */],
            __WEBPACK_IMPORTED_MODULE_5__constituent_constituent_component__["a" /* ConstituentComponent */],
            __WEBPACK_IMPORTED_MODULE_6__home_home_component__["a" /* HomeComponent */],
            __WEBPACK_IMPORTED_MODULE_8__menu_dashboard_menu_component__["a" /* DashboardMenuComponent */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_9__shared_accounts_service__["a" /* AccountsService */]
        ]
    })
], DashboardModule);

//# sourceMappingURL=dashboard.module.js.map

/***/ }),

/***/ 249:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__dashboard_routing_urls__ = __webpack_require__(139);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_constituent_search_constituent_search_service__ = __webpack_require__(142);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_material__ = __webpack_require__(27);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DashboardMenuComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var DashboardMenuComponent = (function () {
    function DashboardMenuComponent(router, route, searchService) {
        this.router = router;
        this.route = route;
        this.searchService = searchService;
        this.open = false;
        this.title = 'app works!';
        this.invert = false;
        this.selected = '';
    }
    DashboardMenuComponent.prototype.ngOnInit = function () {
        console.log('hello `dashboard-menu` component');
    };
    DashboardMenuComponent.prototype.ngAfterViewInit = function () {
    };
    DashboardMenuComponent.prototype.newConstituent = function () {
        this.router.navigate([__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__dashboard_routing_urls__["a" /* RouteUrlConstituent */])()], { relativeTo: this.route });
    };
    DashboardMenuComponent.prototype.searchConstituent = function () {
        var _this = this;
        this.searchService.search().subscribe(function (res) { return _this.result = res; });
    };
    DashboardMenuComponent.prototype.openMenu = function () {
        if (this.open === false) {
            // TODO: find out how to programmatically control menu open/close
            // right now can't seem to see if menu open or closed
            this.constituentMenuTrigger.openMenu();
            this.open = true;
        }
    };
    DashboardMenuComponent.prototype.closeMenu = function () {
        // this.constituentMenuTrigger.closeMenu();
    };
    return DashboardMenuComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('constituentMenuButton'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_4__angular_material__["b" /* MdMenuTrigger */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__angular_material__["b" /* MdMenuTrigger */]) === "function" && _a || Object)
], DashboardMenuComponent.prototype, "constituentMenuTrigger", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('appMenuConstituents'),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__angular_material__["c" /* MdMenu */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__angular_material__["c" /* MdMenu */]) === "function" && _b || Object)
], DashboardMenuComponent.prototype, "constituentMenu", void 0);
DashboardMenuComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-dashboard-menu',
        template: __webpack_require__(328),
        styles: [__webpack_require__(316)]
    }),
    __metadata("design:paramtypes", [typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* ActivatedRoute */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_3__shared_constituent_search_constituent_search_service__["a" /* ConstituentSearchService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__shared_constituent_search_constituent_search_service__["a" /* ConstituentSearchService */]) === "function" && _e || Object])
], DashboardMenuComponent);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=dashboard-menu.component.js.map

/***/ }),

/***/ 250:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AccountsService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AccountsService = (function () {
    function AccountsService() {
    }
    return AccountsService;
}());
AccountsService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [])
], AccountsService);

//# sourceMappingURL=accounts.service.js.map

/***/ }),

/***/ 251:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_flex_layout__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_material__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__login_component__ = __webpack_require__(144);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var LoginModule = (function () {
    function LoginModule() {
    }
    return LoginModule;
}());
LoginModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_2__angular_common__["CommonModule"],
            __WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_material__["a" /* MaterialModule */],
            __WEBPACK_IMPORTED_MODULE_1__angular_flex_layout__["a" /* FlexLayoutModule */]
        ],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_5__login_component__["a" /* LoginComponent */],
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_5__login_component__["a" /* LoginComponent */],
        ]
    })
], LoginModule);

//# sourceMappingURL=login.module.js.map

/***/ }),

/***/ 252:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_material__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__message_box_component__ = __webpack_require__(145);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MessageBoxService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var MessageBoxService = (function () {
    function MessageBoxService(dialog) {
        this.dialog = dialog;
    }
    MessageBoxService.prototype.confirm = function (title, message) {
        var dialogRef;
        dialogRef = this.dialog.open(__WEBPACK_IMPORTED_MODULE_2__message_box_component__["a" /* MessageBoxComponent */]);
        dialogRef.componentInstance.title = title;
        dialogRef.componentInstance.message = message;
        return dialogRef.afterClosed();
    };
    return MessageBoxService;
}());
MessageBoxService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_material__["d" /* MdDialog */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_material__["d" /* MdDialog */]) === "function" && _a || Object])
], MessageBoxService);

var _a;
//# sourceMappingURL=message-box.service.js.map

/***/ }),

/***/ 253:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__custom_material_module__ = __webpack_require__(143);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__constituent_search_constituent_search_component__ = __webpack_require__(141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__constituent_search_constituent_search_service__ = __webpack_require__(142);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__message_box_message_box_component__ = __webpack_require__(145);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__message_box_message_box_service__ = __webpack_require__(252);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SharedModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








var SharedModule = (function () {
    function SharedModule() {
    }
    return SharedModule;
}());
SharedModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_3__custom_material_module__["a" /* CustomMaterialModule */]
        ],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_4__constituent_search_constituent_search_component__["a" /* ConstituentSearchComponent */],
            __WEBPACK_IMPORTED_MODULE_6__message_box_message_box_component__["a" /* MessageBoxComponent */]
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_4__constituent_search_constituent_search_component__["a" /* ConstituentSearchComponent */],
            __WEBPACK_IMPORTED_MODULE_6__message_box_message_box_component__["a" /* MessageBoxComponent */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_5__constituent_search_constituent_search_service__["a" /* ConstituentSearchService */],
            __WEBPACK_IMPORTED_MODULE_7__message_box_message_box_service__["a" /* MessageBoxService */]
        ],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_4__constituent_search_constituent_search_component__["a" /* ConstituentSearchComponent */],
            __WEBPACK_IMPORTED_MODULE_6__message_box_message_box_component__["a" /* MessageBoxComponent */]
        ]
    })
], SharedModule);

//# sourceMappingURL=shared.module.js.map

/***/ }),

/***/ 312:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(17)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 313:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(17)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 314:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(17)();
// imports


// module
exports.push([module.i, ".dashboard-tabs {\r\n    -webkit-box-pack: center;\r\n        -ms-flex-pack: center;\r\n            justify-content: center;\r\n}\r\n\r\n.dashboard-tab {\r\n  font-size: 14pt;\r\n}\r\n\r\n.dashboard-content {\r\n  max-width: 1080px;\r\n}\r\n\r\n.material-icons {\r\n  color: darkgray;\r\n}\r\n\r\n.mdl-navigation__link {\r\n  padding-left: 4px;\r\n}\r\n\r\n.mat-icon {\r\n  height: 18px;\r\n  width: 18px;\r\n  font-size: 18px;\r\n}\r\n\r\n.header-image{\r\n   background: url(" + __webpack_require__(210) + ") 100% 100% no-repeat;\r\n   background-size:  cover;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 315:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(17)();
// imports


// module
exports.push([module.i, ".home {\n\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 316:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(17)();
// imports


// module
exports.push([module.i, ".flex-toolbar {\r\n  -ms-flex-wrap: wrap;\r\n      flex-wrap: wrap;\r\n}\r\n\r\n.mat-menu-item {\r\n  font-size: 14px;\r\n  font-weight: 500;\r\n}\r\n\r\n.card-1 {\r\n  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);\r\n  transition: all 0.3s cubic-bezier(.25,.8,.25,1);\r\n}\r\n \r\n.menu-icon {\r\n  color: #5B616A;\r\n  font-size: 16px;\r\n  position: relative;\r\n  top: 2px;\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 317:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(17)();
// imports


// module
exports.push([module.i, ".aligner {\r\n  display: -webkit-box;\r\n  display: -ms-flexbox;\r\n  display: flex;  \r\n  -webkit-box-align: center;  \r\n      -ms-flex-align: center;  \r\n          align-items: center;\r\n  -webkit-box-pack: center;\r\n      -ms-flex-pack: center;\r\n          justify-content: center;\r\n}\r\n\r\n.font-20 {\r\n  font-size: 20px;\r\n}\r\n\r\n.help {\r\n  font-size: 14px;\r\n  position: relative;\r\n  top: 4px;\r\n  color: #448aff;\r\n  \r\n}\r\n\r\n.secure {\r\n  font-size: 20px;\r\n  width:30px;\r\n  position: relative;\r\n  text-align: right;\r\n  top: 3px;\r\n}\r\n\r\n.full-screen {\r\n    height: 100vh;\r\n    width: 100vw;\r\n    margin: 0;\r\n}\r\n\r\n.card-5 {\r\n  box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22) !important;\r\n}\r\n\r\n.max-width {\r\n  max-width:400px;\r\n  margin: auto;\r\n  -ms-flex-line-pack: center;\r\n      align-content: center; \r\n  height: 100%;\r\n}\r\n\r\n.background {\r\n  background-image: url(" + __webpack_require__(210) + "); \r\n  background-position: center center;\r\n\tbackground-repeat:  no-repeat;\r\n\tbackground-attachment: fixed;\r\n\tbackground-size:  cover;\r\n}\r\n\r\n.full-width {\r\n  width: 100%;\r\n  margin: 0px;\r\n  min-width: 300px;\r\n}\r\n \r\n.login-text {\r\n  color: #5B616A\r\n}\r\n\r\n.md-input-container {\r\n   font-size: 12pt;\r\n}\r\n  ", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 318:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(17)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 324:
/***/ (function(module, exports) {

module.exports = "<div>\n  <router-outlet></router-outlet>\n</div>"

/***/ }),

/***/ 325:
/***/ (function(module, exports) {

module.exports = "<md-tab-group>\n  <md-tab label=\"Name/Address\">\n    <md-card>\n      <h1>Some tab content</h1>\n      <p>...</p>\n    </md-card>\n  </md-tab>\n  <md-tab label=\"Demographics\">\n    <md-card>\n      <h1>Some tab content</h1>\n      <p>...</p>\n    </md-card>\n  </md-tab>\n  <md-tab label=\"Status\">\n    <md-card>\n      <h1>Some more tab content</h1>\n      <p>...</p>\n    </md-card>\n  </md-tab>\n  <md-tab label=\"HOW\">\n    <md-card>\n      <h1>Some more tab content</h1>\n      <p>...</p>\n    </md-card>\n  </md-tab>\n  <md-tab label=\"NAPIS\">\n    <md-card>\n      <h1>Some more tab content</h1>\n      <p>...</p>\n    </md-card>\n  </md-tab>  \n  <md-tab label=\"Cases/Services\">\n    <md-card>\n      <h1>Some more tab content</h1>\n      <p>...</p>\n    </md-card>\n  </md-tab>\n</md-tab-group>\n"

/***/ }),

/***/ 326:
/***/ (function(module, exports) {

module.exports = "<md-toolbar color=\"primary\" class=\"header-image\">\r\n  <span>OpenCaseWork</span>\r\n  <!-- This fills the remaining space of the current row -->\r\n  \r\n  <span class=\"fill-remaining-space\"></span>\r\n  <span>Hello, Keith!</span>\r\n\r\n  <button md-icon-button [mdMenuTriggerFor]=\"userMenu\" aria-label=\"Open basic menu\">\r\n    <md-icon>more_vert</md-icon>    \r\n  </button>\r\n\r\n  <md-menu #userMenu=\"mdMenu\" xPosition=\"before\" yPosition=\"below\">\r\n    <button md-menu-item (click)=\"logout()\"><md-icon>exit_to_app</md-icon>Logout</button>\r\n    <button md-menu-item>Profile</button>\r\n  </md-menu>\r\n</md-toolbar>\r\n\r\n<!--md-toolbar color=\"accent\">\r\n  <span>NSSC: {{title}}</span>\r\n</md-toolbar-->\r\n<app-dashboard-menu></app-dashboard-menu>\r\n<div>\r\n  <router-outlet></router-outlet>\r\n</div>\r\n"

/***/ }),

/***/ 327:
/***/ (function(module, exports) {

module.exports = "<div class=\"home\"> Hello HomeComponent! </div>"

/***/ }),

/***/ 328:
/***/ (function(module, exports) {

module.exports = "<md-toolbar class=\"card-1\">\r\n  <div class=\"flex-toolbar\" fxLayout=\"row\" fxLayout.xs=\"column\">\r\n    <button md-button [mdMenuTriggerFor]=\"appMenuConstituents\" \r\n      (mouseenter)=\"openMenu()\"\r\n      (mouseleave)=\"closeMenu()\"\r\n      #constituentMenuButton=\"mdMenuTrigger\"><md-icon class=\"menu-icon\">people</md-icon>Constituents</button>\r\n    <md-menu #appMenuConstituents=\"mdMenu\" [overlapTrigger]=\"false\">\r\n      <button md-menu-item (click)=\"searchConstituent()\"><md-icon>search</md-icon>Search</button>\r\n      <button md-menu-item (click)=\"newConstituent()\"><md-icon>add</md-icon>New</button>\r\n    </md-menu>\r\n\r\n    <button md-button [mdMenuTriggerFor]=\"appMenuHOW\"><md-icon class=\"menu-icon\">home</md-icon>HOW</button>\r\n    <md-menu #appMenuHOW=\"mdMenu\" [overlapTrigger]=\"false\">\r\n      <button md-menu-item (click)=\"howBilling()\"><md-icon>attach_money</md-icon>Input Billing</button>\r\n      <button md-menu-item (click)=\"howReports()\"><md-icon>list</md-icon>Reports</button>\r\n    </md-menu>\r\n\r\n    <button md-button [mdMenuTriggerFor]=\"appMenuHOW\"><md-icon class=\"menu-icon\">list</md-icon>Reports</button>\r\n    <md-menu #appMenuHOW=\"mdMenu\" [overlapTrigger]=\"false\">\r\n      <button md-menu-item (click)=\"howBilling()\"><md-icon>attach_money</md-icon>Input Billing</button>\r\n      <button md-menu-item (click)=\"howReports()\"><md-icon>list</md-icon>Reports</button>\r\n    </md-menu>\r\n\r\n\r\n    <button md-button [mdMenuTriggerFor]=\"appMenuSocial\"><md-icon class=\"menu-icon\">business</md-icon>Social Services</button>\r\n    <md-menu #appMenuSocial=\"mdMenu\" [overlapTrigger]=\"false\">\r\n      <button md-menu-item (click)=\"dailyTimeEntry()\"><md-icon>event</md-icon>Daily Time Entry</button>\r\n      <button md-menu-item (click)=\"newNAPISIntake()\"><md-icon>add</md-icon>New NAPIS Intake</button>\r\n      <button md-menu-item (click)=\"newNAPISIntake()\"><md-icon>add</md-icon>Social Services</button>\r\n    </md-menu>  \r\n  </div>\r\n</md-toolbar>\r\n"

/***/ }),

/***/ 329:
/***/ (function(module, exports) {

module.exports = "<md-card class=\"md-elevation-z10\">\r\n  <md-card-title>Constituent Search</md-card-title>\r\n  <md-card-subtitle class=\"font-20\">Search Criteria</md-card-subtitle>\r\n  <md-card-content>\r\n    <div>\r\n      <md-input-container class=\"full-width\">\r\n        <input type=\"text\" [(ngModel)]=\"lastname\" mdInput placeholder=\"Last Name\" id=\"LastName\">\r\n      </md-input-container>\r\n    </div>\r\n    <div>\r\n      <md-input-container class=\"full-width\">\r\n        <input type=\"text\" [(ngModel)]=\"firstname\" mdInput placeholder=\"First Name\" id=\"FirstName\">\r\n      </md-input-container>\r\n    </div>\r\n  </md-card-content>\r\n  <md-card-actions>\r\n    <button md-button color=\"primary\" (click)=\"login();\">Search</button>\r\n  </md-card-actions>\r\n</md-card>\r\n<div><br></div>\r\n<div>\r\n  <button type=\"button\" color=\"primary\" md-raised-button (click)=\"dialogRef.close(true)\">OK</button>\r\n  <button type=\"button\" color=\"primary\" md-button (click)=\"dialogRef.close()\">Cancel</button>\r\n</div>"

/***/ }),

/***/ 330:
/***/ (function(module, exports) {

module.exports = "<div fxLayout=\"row\" class=\"background\">\r\n  <div class=\"full-screen\">\r\n    <div class=\"max-width aligner\">\r\n      <md-card class=\"card-5\">\r\n        <md-card-title class=\"login-text\">\r\n          <h2>OpenCaseWork</h2>\r\n        </md-card-title>\r\n        <md-card-subtitle class=\"font-20\">Secure Sign In\r\n          <md-icon class=\"secure\">lock</md-icon>\r\n        </md-card-subtitle>\r\n        <md-card-content>\r\n          <div class=\"login-text\">\r\n            <md-input-container class=\"full-width\">\r\n              <input type=\"text\" [(ngModel)]=\"username\" mdInput placeholder=\"Username\" id=\"username\" required>\r\n            </md-input-container>\r\n          </div>\r\n          <div class=\"login-text\">\r\n            <md-input-container class=\"full-width\">\r\n              <input type=\"password\" [(ngModel)]=\"password\" mdInput placeholder=\"Password\" id=\"password\" required>\r\n            </md-input-container>\r\n          </div>\r\n        </md-card-content>\r\n        <md-card-actions>\r\n          <button md-button color=\"primary\" (click)=\"login();\">Sign In</button>\r\n          <button md-button color=\"primary\" (click)=\"login();\">Forgot Password<md-icon class=\"help\">help</md-icon></button>\r\n        </md-card-actions>\r\n      </md-card>\r\n    </div>\r\n  </div>\r\n</div>"

/***/ }),

/***/ 331:
/***/ (function(module, exports) {

module.exports = "<p>{{ title }}</p>\r\n<p>{{ message }}</p>\r\n  <button type=\"button\" md-raised-button \r\n    (click)=\"dialogRef.close(true)\">OK</button>\r\n  <button type=\"button\" md-button \r\n    (click)=\"dialogRef.close()\">Cancel</button>\r\n        "

/***/ }),

/***/ 40:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__environments_environment__ = __webpack_require__(146);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EnvironmentService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var EnvironmentService = (function () {
    function EnvironmentService() {
        this.isProduction = __WEBPACK_IMPORTED_MODULE_1__environments_environment__["a" /* environment */].production;
        this.idleSeconds = __WEBPACK_IMPORTED_MODULE_1__environments_environment__["a" /* environment */].idleSeconds;
        this.idleCountdownSeconds = __WEBPACK_IMPORTED_MODULE_1__environments_environment__["a" /* environment */].idleCountdownSeconds;
        this.hmr = __WEBPACK_IMPORTED_MODULE_1__environments_environment__["a" /* environment */].hmr;
        this.apiBaseUrl = __WEBPACK_IMPORTED_MODULE_1__environments_environment__["a" /* environment */].apiBaseUrl;
        this.idServer = __WEBPACK_IMPORTED_MODULE_1__environments_environment__["a" /* environment */].idServer;
    }
    return EnvironmentService;
}());
EnvironmentService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [])
], EnvironmentService);

//# sourceMappingURL=environment.service.js.map

/***/ }),

/***/ 58:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = RouteUrlLogin;
/* harmony export (immutable) */ __webpack_exports__["b"] = RouteUrlDashboard;
/** The only way to wrap strings used in routes seems to be via exported function. */
/** These are currently referenced from the route modules */
/** The only way to wrap strings used in routes seems to be via exported function. */ function RouteUrlLogin() {
    return 'login';
}
function RouteUrlDashboard() {
    return 'dashboard';
}
//# sourceMappingURL=app-routing.urls.js.map

/***/ }),

/***/ 581:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(212);


/***/ }),

/***/ 59:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular_oauth2_oidc__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular_oauth2_oidc___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_angular_oauth2_oidc__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__environment_service__ = __webpack_require__(40);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AuthService = (function () {
    function AuthService(environmentService, oauthService) {
        this.environmentService = environmentService;
        this.oauthService = oauthService;
        this.loggedIn = false;
        // console.log('AuthService.constructor oauthService', this.oauthService);
        // The SPA's id. Register SPA with this id at the auth-server
        this.oauthService.clientId = 'olb-resource-owner';
        // set the scope for the permissions the client should request
        // The auth-server used here only returns a refresh token (see below), when the scope offline_access is requested
        this.oauthService.scope = 'openid profile email offline_access olbapi';
        // Use setStorage to use sessionStorage or another implementation of the TS-type Storage
        // instead of localStorage
        this.oauthService.setStorage(sessionStorage);
        // Set a dummy secret
        // Please note that the auth-server used here demand the client to transmit a client secret, although
        // the standard explicitly cites that the password flow can also be used without it. Using a client secret
        // does not make sense for a SPA that runs in the browser. That's why the property is called dummyClientSecret
        // Using such a dummy secreat is as safe as using no secret.
        this.oauthService.dummyClientSecret = 'olbui';
        // this.oauthService.redirectUri = 'http://localhost:4200/index.html';
        this.oauthService.oidc = true;
        // Load Discovery Document and then try to login the user
        var url = this.environmentService.idServer + '.well-known/openid-configuration';
        this.oauthService.loadDiscoveryDocument(url).then(function () {
            // Do what ever you want here
        });
    }
    AuthService.prototype.login = function (userName, password) {
        var _this = this;
        // TODO: capture tokens into local storage
        // Return a new Promise with boolean to the caller
        // If authentication succeeds, resolve and return true
        // Upon authentication failure, reject and return false
        // Can return any and reject caught error, too.
        return new Promise(function (resolve, reject) {
            console.log('before oauthService call');
            _this.oauthService
                .fetchTokenUsingPasswordFlowAndLoadUserProfile(userName, password)
                .then(function (response) {
                console.log('AuthService.login success', response);
                _this.loggedIn = true;
                return resolve(_this.loggedIn);
            })
                .catch(function (err) {
                console.log('AuthService.login error', err);
                _this.loggedIn = false;
                return reject(_this.loggedIn);
            });
        });
    };
    /**
    * Used by auth guard to determine if user is logged in
    */
    AuthService.prototype.isLoggedIn = function () {
        // always says you're logged in for development,
        // to prevent auto-navigation on refresh of app
        if (this.environmentService.isProduction === false) {
            return true;
        }
        else {
            return this.loggedIn;
        }
    };
    AuthService.prototype.logout = function () {
        this.loggedIn = false;
        // Route to login page;
        console.log('log out');
        // TODO: clear out local storage
    };
    return AuthService;
}());
AuthService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])()
    // see https://auth0.com/blog/angular-2-authentication/ for some implementation concepts
    ,
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__environment_service__["a" /* EnvironmentService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__environment_service__["a" /* EnvironmentService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_angular_oauth2_oidc__["OAuthService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_angular_oauth2_oidc__["OAuthService"]) === "function" && _b || Object])
], AuthService);

var _a, _b;
//# sourceMappingURL=auth.service.js.map

/***/ }),

/***/ 60:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__environment_service__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__level__ = __webpack_require__(245);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LogService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



// Some browsers don't implement the debug method
var CONSOLE_DEBUG_METHOD = console['debug'] ? 'debug' : 'log';
var LogService = (function () {
    function LogService(environmentService) {
        this.environmentService = environmentService;
        if (environmentService.isProduction === true) {
            this.setLevel(__WEBPACK_IMPORTED_MODULE_2__level__["a" /* Level */].ERROR);
        }
        else {
            this.setLevel(__WEBPACK_IMPORTED_MODULE_2__level__["a" /* Level */].LOG);
        }
    }
    LogService.prototype.setLevel = function (level) {
        this.level = level;
        this.setFlags();
    };
    LogService.prototype.setFlags = function () {
        this.isErrorEnabled = this.level >= __WEBPACK_IMPORTED_MODULE_2__level__["a" /* Level */].ERROR;
        this.isWarnEnabled = this.level >= __WEBPACK_IMPORTED_MODULE_2__level__["a" /* Level */].WARN;
        this.isInfoEnabled = this.level >= __WEBPACK_IMPORTED_MODULE_2__level__["a" /* Level */].INFO;
        this.isDebugEnabled = this.level >= __WEBPACK_IMPORTED_MODULE_2__level__["a" /* Level */].DEBUG;
        this.isLogEnabled = this.level >= __WEBPACK_IMPORTED_MODULE_2__level__["a" /* Level */].LOG;
    };
    LogService.prototype.info = function (msg) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (this.isInfoEnabled) {
            console.log.apply(console, arguments);
        }
    };
    LogService.prototype.warn = function (msg) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (this.isWarnEnabled) {
            console.warn.apply(console, arguments);
        }
    };
    LogService.prototype.error = function (message) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (this.isErrorEnabled) {
            console.error.apply(console, arguments);
        }
    };
    LogService.prototype.debug = function (message) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (this.isDebugEnabled) {
            console[CONSOLE_DEBUG_METHOD].apply(console, arguments);
        }
    };
    LogService.prototype.log = function (message) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (this.isLogEnabled) {
            console.log.apply(console, arguments);
        }
    };
    return LogService;
}());
LogService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__environment_service__["a" /* EnvironmentService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__environment_service__["a" /* EnvironmentService */]) === "function" && _a || Object])
], LogService);

var _a;
//# sourceMappingURL=log.service.js.map

/***/ }),

/***/ 84:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__auth_service__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__logging_log_service__ = __webpack_require__(60);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthGuardService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AuthGuardService = (function () {
    function AuthGuardService(authService, router, logService) {
        this.authService = authService;
        this.router = router;
        this.logService = logService;
    }
    AuthGuardService.prototype.canActivate = function (route, state) {
        var url = state.url;
        this.logService.log('url', url);
        return this.checkLogin(url);
    };
    AuthGuardService.prototype.checkLogin = function (url) {
        this.logService.log('AuthGuardService.checkLogin: ' + this.authService.isLoggedIn());
        if (this.authService.isLoggedIn()) {
            return true;
        }
        // Store the attempted URL for redirecting
        this.authService.redirectUrl = url;
        // Navigate to the login page with extras
        this.router.navigate(['login']);
        return false;
    };
    return AuthGuardService;
}());
AuthGuardService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__auth_service__["a" /* AuthService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__logging_log_service__["a" /* LogService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__logging_log_service__["a" /* LogService */]) === "function" && _c || Object])
], AuthGuardService);

var _a, _b, _c;
//# sourceMappingURL=auth-guard.service.js.map

/***/ }),

/***/ 85:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_routing_urls__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environment_service__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__auth_auth_service__ = __webpack_require__(59);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SessionService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var SessionService = (function () {
    function SessionService(router, environmentService, authService) {
        this.router = router;
        this.environmentService = environmentService;
        this.authService = authService;
    }
    ;
    SessionService.prototype.logout = function () {
        this.authService.logout();
        this.router.navigate([__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__app_routing_urls__["a" /* RouteUrlLogin */])()]);
        // TODO: clear out local storage
    };
    return SessionService;
}());
SessionService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__environment_service__["a" /* EnvironmentService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__environment_service__["a" /* EnvironmentService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__auth_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__auth_auth_service__["a" /* AuthService */]) === "function" && _c || Object])
], SessionService);

var _a, _b, _c;
//# sourceMappingURL=session.service.js.map

/***/ }),

/***/ 86:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core_session_session_service__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__core_session_idle_service__ = __webpack_require__(138);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DashboardComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var DashboardComponent = (function () {
    function DashboardComponent(router, route, sessionService, idleService) {
        this.router = router;
        this.route = route;
        this.sessionService = sessionService;
        this.idleService = idleService;
    }
    DashboardComponent.prototype.ngOnInit = function () {
        this.idleService.reset();
    };
    DashboardComponent.prototype.logout = function () {
        this.sessionService.logout();
        this.idleService.stop();
    };
    return DashboardComponent;
}());
DashboardComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-dashboard',
        template: __webpack_require__(326),
        styles: [__webpack_require__(314)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* ActivatedRoute */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__core_session_session_service__["a" /* SessionService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__core_session_session_service__["a" /* SessionService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__core_session_idle_service__["a" /* IdleService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__core_session_idle_service__["a" /* IdleService */]) === "function" && _d || Object])
], DashboardComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=dashboard.component.js.map

/***/ })

},[581]);
//# sourceMappingURL=main.bundle.js.map