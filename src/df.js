var l = Object.defineProperty,
	c = Object.defineProperties;
var h = Object.getOwnPropertyDescriptors;
var o = Object.getOwnPropertySymbols;
var y = Object.prototype.hasOwnProperty,
	x = Object.prototype.propertyIsEnumerable;

var p = (t, e, r) => (e in t ? l(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : (t[e] = r)),
	a = (t, e) => {
		for (var r in e || (e = {})) y.call(e, r) && p(t, r, e[r]);
		if (o) for (var r of o(e)) x.call(e, r) && p(t, r, e[r]);
		return t;
	},
	n = (t, e) => c(t, h(e));
import { MapboxLayer as d } from '@deck.gl/mapbox';
import { WxTilesLayerProps as b, WxTilesLayer as u, WXLOG as s } from '@metoceanapi/wxtiles-deckgl';
import '@metoceanapi/wxtiles-deckgl/dist/es/wxtilesdeckgl.css';
import {
	setupWxTilesLib as W,
	setWxTilesLogging as v,
	createWxTilesLayerProps as M,
	LibSetupObject as k,
	CreateProps as S,
	WxServerVarsStyleType as C,
} from '@metoceanapi/wxtiles-deckgl';
var m = class {
	constructor({ map: e, props: r, beforeLayerId: i }) {
		this.currentIndex = 0;
		this.layerId = '';
		this.beforeLayerId = void 0;
		(this.map = e), (this.props = r), (this.beforeLayerId = i);
	}
	nextTimestep() {
		return s('nextTimestep'), this.goToTimestep(this.currentIndex + 1);
	}
	prevTimestep() {
		return s('prevTimestep'), this.goToTimestep(this.currentIndex - 1);
	}
	cancel() {
		this.cancelNewLayerPromise && (s('cancel'), this.cancelNewLayerPromise());
	}
	remove() {
		s('remove'), this.cancel(), this.layer && this.map.removeLayer(this.layerId), (this.layer = void 0);
	}
	renderCurrentTimestep() {
		return s('renderCurrentTimestep'), this.goToTimestep(this.currentIndex);
	}
	goToTimestep(e) {
		if ((s('goToTimestep:', e), this.cancel(), (e = this._checkIndex(e)), this.layer && e === this.currentIndex)) return Promise.resolve(this.currentIndex);
		(this.currentIndex = e), (this.layerId = this.props.id);
		let r = this.props.wxprops.URITime.replace('{time}', this.props.wxprops.meta.times[e]),
			i = n(a({ type: u }, this.props), { data: r });
		return this.layer ? this.layer.setProps(i) : ((this.layer = new d(i)), this.map.addLayer(this.layer, this.beforeLayerId)), Promise.resolve(e);
	}
	_checkIndex(e) {
		return (e + this.props.wxprops.meta.times.length) % this.props.wxprops.meta.times.length;
	}
};
function P(t, e, r = t.getStyle().layers[t.getStyle().layers.length - 1].id) {
	return new m({ map: t, props: e, beforeLayerId: r });
}
export {
	S as CreateProps,
	k as LibSetupObject,
	s as WXLOG,
	C as WxServerVarsStyleType,
	u as WxTilesLayer,
	m as WxTilesLayerManager,
	b as WxTilesLayerProps,
	P as createMapboxLayer,
	M as createWxTilesLayerProps,
	v as setWxTilesLogging,
	W as setupWxTilesLib,
};
