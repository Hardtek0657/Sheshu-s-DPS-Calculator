/*! For license information please see 72.script.js.LICENSE.txt */
"use strict";
(self.webpackChunk = self.webpackChunk || []).push([
  [72],
  {
    4732: (e, t, r) => {
      var i = r(8507);
      class s {
        static init(e) {
          Object.defineProperty(this, "resizeTo", {
            set(e) {
              globalThis.removeEventListener("resize", this.queueResize),
                (this._resizeTo = e),
                e &&
                  (globalThis.addEventListener("resize", this.queueResize),
                  this.resize());
            },
            get() {
              return this._resizeTo;
            },
          }),
            (this.queueResize = () => {
              this._resizeTo &&
                (this._cancelResize(),
                (this._resizeId = requestAnimationFrame(() => this.resize())));
            }),
            (this._cancelResize = () => {
              this._resizeId &&
                (cancelAnimationFrame(this._resizeId), (this._resizeId = null));
            }),
            (this.resize = () => {
              if (!this._resizeTo) return;
              let e, t;
              if ((this._cancelResize(), this._resizeTo === globalThis.window))
                (e = globalThis.innerWidth), (t = globalThis.innerHeight);
              else {
                const { clientWidth: r, clientHeight: i } = this._resizeTo;
                (e = r), (t = i);
              }
              this.renderer.resize(e, t), this.render();
            }),
            (this._resizeId = null),
            (this._resizeTo = null),
            (this.resizeTo = e.resizeTo || null);
        }
        static destroy() {
          globalThis.removeEventListener("resize", this.queueResize),
            this._cancelResize(),
            (this._cancelResize = null),
            (this.queueResize = null),
            (this.resizeTo = null),
            (this.resize = null);
        }
      }
      s.extension = i.Ag.Application;
      var n = r(4458),
        a = r(7309);
      class o {
        static init(e) {
          (e = Object.assign({ autoStart: !0, sharedTicker: !1 }, e)),
            Object.defineProperty(this, "ticker", {
              set(e) {
                this._ticker && this._ticker.remove(this.render, this),
                  (this._ticker = e),
                  e && e.add(this.render, this, n.d.LOW);
              },
              get() {
                return this._ticker;
              },
            }),
            (this.stop = () => {
              this._ticker.stop();
            }),
            (this.start = () => {
              this._ticker.start();
            }),
            (this._ticker = null),
            (this.ticker = e.sharedTicker ? a.R.shared : new a.R()),
            e.autoStart && this.start();
        }
        static destroy() {
          if (this._ticker) {
            const e = this._ticker;
            (this.ticker = null), e.destroy();
          }
        }
      }
      (o.extension = i.Ag.Application), i.XO.add(s), i.XO.add(o);
    },
    9935: (e, t, r) => {
      var i = r(8507);
      class s {
        constructor(e) {
          this._renderer = e;
        }
        push(e, t, r) {
          this._renderer.renderPipes.batch.break(r),
            r.add({
              renderPipeId: "filter",
              canBundle: !1,
              action: "pushFilter",
              container: t,
              filterEffect: e,
            });
        }
        pop(e, t, r) {
          this._renderer.renderPipes.batch.break(r),
            r.add({
              renderPipeId: "filter",
              action: "popFilter",
              canBundle: !1,
            });
        }
        execute(e) {
          "pushFilter" === e.action
            ? this._renderer.filter.push(e)
            : "popFilter" === e.action && this._renderer.filter.pop();
        }
        destroy() {
          this._renderer = null;
        }
      }
      s.extension = {
        type: [i.Ag.WebGLPipes, i.Ag.WebGPUPipes, i.Ag.CanvasPipes],
        name: "filter",
      };
      var n = r(9313),
        a = r(5101),
        o = r(3513),
        h = r(6011),
        l = r(7222),
        d = r(4492),
        u = r(2437),
        c = r(5099),
        p = r(9636),
        g = r(2208);
      const f = new n.u();
      function m(e, t) {
        return (
          t.clear(),
          x(e, t),
          t.isValid || t.set(0, 0, 0, 0),
          e.isRenderGroupRoot
            ? t.applyMatrix(e.renderGroup.localTransform)
            : t.applyMatrix(e.renderGroup.worldTransform),
          t
        );
      }
      function x(e, t) {
        if (7 !== e.localDisplayStatus || !e.measurable) return;
        const r = !!e.effects.length;
        let i = t;
        if (
          ((e.isRenderGroupRoot || r) && (i = g.o.get().clear()), e.boundsArea)
        )
          t.addRect(e.boundsArea, e.worldTransform);
        else {
          if (e.renderPipeId) {
            const t = e.bounds;
            i.addFrame(t.minX, t.minY, t.maxX, t.maxY, e.groupTransform);
          }
          const t = e.children;
          for (let e = 0; e < t.length; e++) x(t[e], i);
        }
        if (r) {
          let r = !1;
          for (let t = 0; t < e.effects.length; t++)
            e.effects[t].addBounds &&
              (r || ((r = !0), i.applyMatrix(e.renderGroup.worldTransform)),
              e.effects[t].addBounds(i, !0));
          r &&
            (i.applyMatrix(e.renderGroup.worldTransform.copyTo(f).invert()),
            t.addBounds(i, e.relativeGroupTransform)),
            t.addBounds(i),
            g.o.return(i);
        } else
          e.isRenderGroupRoot &&
            (t.addBounds(i, e.relativeGroupTransform), g.o.return(i));
      }
      var _ = r(268);
      const b = new h.V({
        attributes: {
          aPosition: {
            buffer: new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]),
            location: 0,
            format: "float32x2",
            stride: 8,
            offset: 0,
          },
        },
        indexBuffer: new Uint32Array([0, 1, 2, 0, 2, 3]),
      });
      class y {
        constructor(e) {
          (this._filterStackIndex = 0),
            (this._filterStack = []),
            (this._filterGlobalUniforms = new l.k({
              uInputSize: { value: new Float32Array(4), type: "vec4<f32>" },
              uInputPixel: { value: new Float32Array(4), type: "vec4<f32>" },
              uInputClamp: { value: new Float32Array(4), type: "vec4<f32>" },
              uOutputFrame: { value: new Float32Array(4), type: "vec4<f32>" },
              uGlobalFrame: { value: new Float32Array(4), type: "vec4<f32>" },
              uOutputTexture: { value: new Float32Array(4), type: "vec4<f32>" },
            })),
            (this._globalFilterBindGroup = new o.T({})),
            (this.renderer = e);
        }
        get activeBackTexture() {
          return this._activeFilterData?.backTexture;
        }
        push(e) {
          const t = this.renderer,
            r = e.filterEffect.filters;
          this._filterStack[this._filterStackIndex] ||
            (this._filterStack[this._filterStackIndex] = this._getFilterData());
          const i = this._filterStack[this._filterStackIndex];
          if ((this._filterStackIndex++, 0 === r.length))
            return void (i.skip = !0);
          const s = i.bounds;
          e.renderables
            ? (function (e, t) {
                t.clear();
                const r = t.matrix;
                for (let r = 0; r < e.length; r++) {
                  const i = e[r];
                  i.globalDisplayStatus < 7 ||
                    ((t.matrix = i.worldTransform), i.addBounds(t));
                }
                t.matrix = r;
              })(e.renderables, s)
            : e.filterEffect.filterArea
            ? (s.clear(),
              s.addRect(e.filterEffect.filterArea),
              s.applyMatrix(e.container.worldTransform))
            : m(e.container, s);
          const n = t.renderTarget.rootRenderTarget.colorTexture.source;
          let a = n._resolution,
            o = 0,
            h = n.antialias,
            l = !1,
            d = !1;
          for (let e = 0; e < r.length; e++) {
            const i = r[e];
            (a = Math.min(a, i.resolution)),
              (o += i.padding),
              "inherit" !== i.antialias && (h = "on" === i.antialias);
            if (!!!(i.compatibleRenderers & t.type)) {
              d = !1;
              break;
            }
            if (i.blendRequired && !(t.backBuffer?.useBackBuffer ?? 1)) {
              (0, _.R)(
                "Blend filter requires backBuffer on WebGL renderer to be enabled. Set `useBackBuffer: true` in the renderer options."
              ),
                (d = !1);
              break;
            }
            (d = i.enabled || d), (l = l || i.blendRequired);
          }
          if (!d) return void (i.skip = !0);
          const c = t.renderTarget.rootViewPort;
          s
            .scale(a)
            .fitBounds(0, c.width, 0, c.height)
            .scale(1 / a)
            .pad(o)
            .ceil(),
            s.isPositive
              ? ((i.skip = !1),
                (i.bounds = s),
                (i.blendRequired = l),
                (i.container = e.container),
                (i.filterEffect = e.filterEffect),
                (i.previousRenderSurface = t.renderTarget.renderSurface),
                (i.inputTexture = u.W.getOptimalTexture(
                  s.width,
                  s.height,
                  a,
                  h
                )),
                t.renderTarget.bind(i.inputTexture, !0),
                t.globalUniforms.push({ offset: s }))
              : (i.skip = !0);
        }
        pop() {
          const e = this.renderer;
          this._filterStackIndex--;
          const t = this._filterStack[this._filterStackIndex];
          if (t.skip) return;
          this._activeFilterData = t;
          const r = t.inputTexture,
            i = t.bounds;
          let s = d.g.EMPTY;
          if ((e.renderTarget.finishRenderPass(), t.blendRequired)) {
            const r =
                this._filterStackIndex > 0
                  ? this._filterStack[this._filterStackIndex - 1].bounds
                  : null,
              n = e.renderTarget.getRenderTarget(t.previousRenderSurface);
            s = this.getBackTexture(n, i, r);
          }
          t.backTexture = s;
          const n = t.filterEffect.filters;
          if (
            (this._globalFilterBindGroup.setResource(r.source.style, 2),
            this._globalFilterBindGroup.setResource(s.source, 3),
            e.globalUniforms.pop(),
            1 === n.length)
          )
            n[0].apply(this, r, t.previousRenderSurface, !1),
              u.W.returnTexture(r);
          else {
            let e = t.inputTexture,
              r = u.W.getOptimalTexture(
                i.width,
                i.height,
                e.source._resolution,
                !1
              ),
              s = 0;
            for (s = 0; s < n.length - 1; ++s) {
              n[s].apply(this, e, r, !0);
              const t = e;
              (e = r), (r = t);
            }
            n[s].apply(this, e, t.previousRenderSurface, !1),
              u.W.returnTexture(e),
              u.W.returnTexture(r);
          }
          t.blendRequired && u.W.returnTexture(s);
        }
        getBackTexture(e, t, r) {
          const i = e.colorTexture.source._resolution,
            s = u.W.getOptimalTexture(t.width, t.height, i, !1);
          let n = t.minX,
            a = t.minY;
          r && ((n -= r.minX), (a -= r.minY)),
            (n = Math.floor(n * i)),
            (a = Math.floor(a * i));
          const o = Math.ceil(t.width * i),
            h = Math.ceil(t.height * i);
          return (
            this.renderer.renderTarget.copyToTexture(
              e,
              s,
              { x: n, y: a },
              { width: o, height: h },
              { x: 0, y: 0 }
            ),
            s
          );
        }
        applyFilter(e, t, r, i) {
          const s = this.renderer,
            n = this._filterStack[this._filterStackIndex],
            o = n.bounds,
            h = a.b.shared,
            l = n.previousRenderSurface === r;
          let u =
              this.renderer.renderTarget.rootRenderTarget.colorTexture.source
                ._resolution,
            p = this._filterStackIndex - 1;
          for (; p > 0 && this._filterStack[p].skip; ) --p;
          p > 0 && (u = this._filterStack[p].inputTexture.source._resolution);
          const g = this._filterGlobalUniforms,
            f = g.uniforms,
            m = f.uOutputFrame,
            x = f.uInputSize,
            _ = f.uInputPixel,
            y = f.uInputClamp,
            T = f.uGlobalFrame,
            v = f.uOutputTexture;
          if (l) {
            let e = this._filterStackIndex;
            for (; e > 0; ) {
              e--;
              const t = this._filterStack[this._filterStackIndex - 1];
              if (!t.skip) {
                (h.x = t.bounds.minX), (h.y = t.bounds.minY);
                break;
              }
            }
            (m[0] = o.minX - h.x), (m[1] = o.minY - h.y);
          } else (m[0] = 0), (m[1] = 0);
          (m[2] = t.frame.width),
            (m[3] = t.frame.height),
            (x[0] = t.source.width),
            (x[1] = t.source.height),
            (x[2] = 1 / x[0]),
            (x[3] = 1 / x[1]),
            (_[0] = t.source.pixelWidth),
            (_[1] = t.source.pixelHeight),
            (_[2] = 1 / _[0]),
            (_[3] = 1 / _[1]),
            (y[0] = 0.5 * _[2]),
            (y[1] = 0.5 * _[3]),
            (y[2] = t.frame.width * x[2] - 0.5 * _[2]),
            (y[3] = t.frame.height * x[3] - 0.5 * _[3]);
          const w = this.renderer.renderTarget.rootRenderTarget.colorTexture;
          (T[0] = h.x * u),
            (T[1] = h.y * u),
            (T[2] = w.source.width * u),
            (T[3] = w.source.height * u);
          const S = this.renderer.renderTarget.getRenderTarget(r);
          if (
            (s.renderTarget.bind(r, !!i),
            r instanceof d.g
              ? ((v[0] = r.frame.width), (v[1] = r.frame.height))
              : ((v[0] = S.width), (v[1] = S.height)),
            (v[2] = S.isRoot ? -1 : 1),
            g.update(),
            s.renderPipes.uniformBatch)
          ) {
            const e = s.renderPipes.uniformBatch.getUboResource(g);
            this._globalFilterBindGroup.setResource(e, 0);
          } else this._globalFilterBindGroup.setResource(g, 0);
          this._globalFilterBindGroup.setResource(t.source, 1),
            this._globalFilterBindGroup.setResource(t.source.style, 2),
            (e.groups[0] = this._globalFilterBindGroup),
            s.encoder.draw({
              geometry: b,
              shader: e,
              state: e._state,
              topology: "triangle-list",
            }),
            s.type === c.W.WEBGL && s.renderTarget.finishRenderPass();
        }
        _getFilterData() {
          return {
            skip: !1,
            inputTexture: null,
            bounds: new p.c(),
            container: null,
            filterEffect: null,
            blendRequired: !1,
            previousRenderSurface: null,
          };
        }
        calculateSpriteMatrix(e, t) {
          const r = this._activeFilterData,
            i = e.set(
              r.inputTexture._source.width,
              0,
              0,
              r.inputTexture._source.height,
              r.bounds.minX,
              r.bounds.minY
            ),
            s = t.worldTransform.copyTo(n.u.shared);
          return (
            s.invert(),
            i.prepend(s),
            i.scale(1 / t.texture.frame.width, 1 / t.texture.frame.height),
            i.translate(t.anchor.x, t.anchor.y),
            i
          );
        }
      }
      (y.extension = {
        type: [i.Ag.WebGLSystem, i.Ag.WebGPUSystem],
        name: "filter",
      }),
        i.XO.add(y),
        i.XO.add(s);
    },
    7608: (e, t, r) => {
      r.d(t, { N: () => n });
      var i = r(1761),
        s = r(9939);
      const n = new (class {
        constructor(e) {
          (this._canvasPool = Object.create(null)),
            (this.canvasOptions = e || {}),
            (this.enableFullScreen = !1);
        }
        _createCanvasAndContext(e, t) {
          const r = i.e.get().createCanvas();
          (r.width = e), (r.height = t);
          const s = r.getContext("2d");
          return { canvas: r, context: s };
        }
        getOptimalCanvasAndContext(e, t, r = 1) {
          (e = Math.ceil(e * r - 1e-6)), (t = Math.ceil(t * r - 1e-6));
          const i = ((e = (0, s.U5)(e)) << 17) + ((t = (0, s.U5)(t)) << 1);
          this._canvasPool[i] || (this._canvasPool[i] = []);
          let n = this._canvasPool[i].pop();
          return n || (n = this._createCanvasAndContext(e, t)), n;
        }
        returnCanvasAndContext(e) {
          const { width: t, height: r } = e.canvas,
            i = (t << 17) + (r << 1);
          this._canvasPool[i].push(e);
        }
        clear() {
          this._canvasPool = {};
        }
      })();
    },
    8928: (e, t, r) => {
      var i = r(8507),
        s = r(3428),
        n = r(7547),
        a = r(8218),
        o = r(2760),
        h = r(6954);
      class l {
        constructor(e, t) {
          (this.state = n.U.for2d()),
            (this._graphicsBatchesHash = Object.create(null)),
            (this.renderer = e),
            (this._adaptor = t),
            this._adaptor.init();
        }
        validateRenderable(e) {
          const t = e.context,
            r = !!this._graphicsBatchesHash[e.uid],
            i = this.renderer.graphicsContext.updateGpuContext(t);
          return !(!i.isBatchable && r === i.isBatchable);
        }
        addRenderable(e, t) {
          const r = this.renderer.graphicsContext.updateGpuContext(e.context);
          e._didGraphicsUpdate &&
            ((e._didGraphicsUpdate = !1), this._rebuild(e)),
            r.isBatchable
              ? this._addToBatcher(e, t)
              : (this.renderer.renderPipes.batch.break(t), t.add(e));
        }
        updateRenderable(e) {
          const t = this._graphicsBatchesHash[e.uid];
          if (t)
            for (let e = 0; e < t.length; e++) {
              const r = t[e];
              r.batcher.updateElement(r);
            }
        }
        destroyRenderable(e) {
          this._graphicsBatchesHash[e.uid] &&
            this._removeBatchForRenderable(e.uid);
        }
        execute(e) {
          if (!e.isRenderable) return;
          const t = this.renderer,
            r = e.context;
          if (!t.graphicsContext.getGpuContext(r).batches.length) return;
          const i = r.customShader || this._adaptor.shader;
          this.state.blendMode = e.groupBlendMode;
          const s = i.resources.localUniforms.uniforms;
          (s.uTransformMatrix = e.groupTransform),
            (s.uRound = t._roundPixels | e._roundPixels),
            (0, o.V)(e.groupColorAlpha, s.uColor, 0),
            this._adaptor.execute(this, e);
        }
        _rebuild(e) {
          const t = !!this._graphicsBatchesHash[e.uid],
            r = this.renderer.graphicsContext.updateGpuContext(e.context);
          t && this._removeBatchForRenderable(e.uid),
            r.isBatchable && this._initBatchesForRenderable(e),
            (e.batched = r.isBatchable);
        }
        _addToBatcher(e, t) {
          const r = this.renderer.renderPipes.batch,
            i = this._getBatchesForRenderable(e);
          for (let e = 0; e < i.length; e++) {
            const s = i[e];
            r.addToBatch(s, t);
          }
        }
        _getBatchesForRenderable(e) {
          return (
            this._graphicsBatchesHash[e.uid] ||
            this._initBatchesForRenderable(e)
          );
        }
        _initBatchesForRenderable(e) {
          const t = e.context,
            r = this.renderer.graphicsContext.getGpuContext(t),
            i = this.renderer._roundPixels | e._roundPixels,
            s = r.batches.map((t) => {
              const r = a.Z.get(h.G);
              return t.copyTo(r), (r.renderable = e), (r.roundPixels = i), r;
            });
          return (
            (this._graphicsBatchesHash[e.uid] = s),
            e.on("destroyed", () => {
              this.destroyRenderable(e);
            }),
            s
          );
        }
        _removeBatchForRenderable(e) {
          this._graphicsBatchesHash[e].forEach((e) => {
            a.Z.return(e);
          }),
            (this._graphicsBatchesHash[e] = null);
        }
        destroy() {
          (this.renderer = null),
            this._adaptor.destroy(),
            (this._adaptor = null),
            (this.state = null);
          for (const e in this._graphicsBatchesHash)
            this._removeBatchForRenderable(e);
          this._graphicsBatchesHash = null;
        }
      }
      (l.extension = {
        type: [i.Ag.WebGLPipes, i.Ag.WebGPUPipes, i.Ag.CanvasPipes],
        name: "graphics",
      }),
        i.XO.add(l),
        i.XO.add(s.GH);
    },
    5285: (e, t, r) => {
      var i = r(8507),
        s = r(9313),
        n = r(3513),
        a = r(7222),
        o = r(8218),
        h = r(2760),
        l = r(8734);
      class d {
        constructor(e, t) {
          (this.localUniforms = new a.k({
            uTransformMatrix: { value: new s.u(), type: "mat3x3<f32>" },
            uColor: {
              value: new Float32Array([1, 1, 1, 1]),
              type: "vec4<f32>",
            },
            uRound: { value: 0, type: "f32" },
          })),
            (this.localUniformsBindGroup = new n.T({ 0: this.localUniforms })),
            (this._meshDataHash = Object.create(null)),
            (this._gpuBatchableMeshHash = Object.create(null)),
            (this.renderer = e),
            (this._adaptor = t),
            this._adaptor.init();
        }
        validateRenderable(e) {
          const t = this._getMeshData(e),
            r = t.batched,
            i = e.batched;
          if (((t.batched = i), r !== i)) return !0;
          if (i) {
            const r = e._geometry;
            if (
              r.indices.length !== t.indexSize ||
              r.positions.length !== t.vertexSize
            )
              return (
                (t.indexSize = r.indices.length),
                (t.vertexSize = r.positions.length),
                !0
              );
            const i = this._getBatchableMesh(e),
              s = e.texture;
            if (
              i.texture._source !== s._source &&
              i.texture._source !== s._source
            )
              return !i.batcher.checkAndUpdateTexture(i, s);
          }
          return !1;
        }
        addRenderable(e, t) {
          const r = this.renderer.renderPipes.batch,
            { batched: i } = this._getMeshData(e);
          if (i) {
            const t = this._getBatchableMesh(e);
            (t.texture = e._texture),
              (t.geometry = e._geometry),
              r.addToBatch(t);
          } else r.break(t), t.add({ renderPipeId: "mesh", mesh: e });
        }
        updateRenderable(e) {
          if (e.batched) {
            const t = this._gpuBatchableMeshHash[e.uid];
            (t.texture = e._texture),
              (t.geometry = e._geometry),
              t.batcher.updateElement(t);
          }
        }
        destroyRenderable(e) {
          this._meshDataHash[e.uid] = null;
          const t = this._gpuBatchableMeshHash[e.uid];
          t && (o.Z.return(t), (this._gpuBatchableMeshHash[e.uid] = null));
        }
        execute({ mesh: e }) {
          if (!e.isRenderable) return;
          e.state.blendMode = e.groupBlendMode;
          const t = this.localUniforms;
          (t.uniforms.uTransformMatrix = e.groupTransform),
            (t.uniforms.uRound = this.renderer._roundPixels | e._roundPixels),
            t.update(),
            (0, h.V)(e.groupColorAlpha, t.uniforms.uColor, 0),
            this._adaptor.execute(this, e);
        }
        _getMeshData(e) {
          return this._meshDataHash[e.uid] || this._initMeshData(e);
        }
        _initMeshData(e) {
          return (
            (this._meshDataHash[e.uid] = {
              batched: e.batched,
              indexSize: e._geometry.indices?.length,
              vertexSize: e._geometry.positions?.length,
            }),
            e.on("destroyed", () => {
              this.destroyRenderable(e);
            }),
            this._meshDataHash[e.uid]
          );
        }
        _getBatchableMesh(e) {
          return (
            this._gpuBatchableMeshHash[e.uid] || this._initBatchableMesh(e)
          );
        }
        _initBatchableMesh(e) {
          const t = o.Z.get(l.U);
          return (
            (t.mesh = e),
            (t.texture = e._texture),
            (t.roundPixels = this.renderer._roundPixels | e._roundPixels),
            (this._gpuBatchableMeshHash[e.uid] = t),
            (t.mesh = e),
            t
          );
        }
        destroy() {
          for (const e in this._gpuBatchableMeshHash)
            this._gpuBatchableMeshHash[e] &&
              o.Z.return(this._gpuBatchableMeshHash[e]);
          (this._gpuBatchableMeshHash = null),
            (this._meshDataHash = null),
            (this.localUniforms = null),
            (this.localUniformsBindGroup = null),
            this._adaptor.destroy(),
            (this._adaptor = null),
            (this.renderer = null);
        }
      }
      (d.extension = {
        type: [i.Ag.WebGLPipes, i.Ag.WebGPUPipes, i.Ag.CanvasPipes],
        name: "mesh",
      }),
        i.XO.add(d);
    },
    8734: (e, t, r) => {
      r.d(t, { U: () => i });
      class i {
        constructor() {
          (this.batcher = null),
            (this.batch = null),
            (this.roundPixels = 0),
            (this._uvUpdateId = -1),
            (this._textureMatrixUpdateId = -1);
        }
        get blendMode() {
          return this.mesh.groupBlendMode;
        }
        reset() {
          (this.mesh = null),
            (this.texture = null),
            (this.batcher = null),
            (this.batch = null);
        }
        packIndex(e, t, r) {
          const i = this.geometry.indices;
          for (let s = 0; s < i.length; s++) e[t++] = i[s] + r;
        }
        packAttributes(e, t, r, i) {
          const s = this.mesh,
            n = this.geometry,
            a = s.groupTransform,
            o = (i << 16) | (65535 & this.roundPixels),
            h = a.a,
            l = a.b,
            d = a.c,
            u = a.d,
            c = a.tx,
            p = a.ty,
            g = n.positions,
            f = n.getBuffer("aUV"),
            m = f.data;
          let x = m;
          const _ = this.texture.textureMatrix;
          _.isSimple ||
            ((x = this._transformedUvs),
            (this._textureMatrixUpdateId === _._updateID &&
              this._uvUpdateId === f._updateID) ||
              ((!x || x.length < m.length) &&
                (x = this._transformedUvs = new Float32Array(m.length)),
              (this._textureMatrixUpdateId = _._updateID),
              (this._uvUpdateId = f._updateID),
              _.multiplyUvs(m, x)));
          const b = s.groupColorAlpha;
          for (let i = 0; i < g.length; i += 2) {
            const s = g[i],
              n = g[i + 1];
            (e[r] = h * s + d * n + c),
              (e[r + 1] = l * s + u * n + p),
              (e[r + 2] = x[i]),
              (e[r + 3] = x[i + 1]),
              (t[r + 4] = b),
              (t[r + 5] = o),
              (r += 6);
          }
        }
        get vertexSize() {
          return this.geometry.positions.length / 2;
        }
        get indexSize() {
          return this.geometry.indices.length;
        }
      }
    },
    5060: (e, t, r) => {
      r.d(t, { u: () => h });
      var i = r(949),
        s = r(1132),
        n = r(6011),
        a = r(4670);
      const o = class e extends n.V {
        constructor(...t) {
          let r = t[0] ?? {};
          r instanceof Float32Array &&
            ((0, a.t)(
              a.l,
              "use new MeshGeometry({ positions, uvs, indices }) instead"
            ),
            (r = { positions: r, uvs: t[1], indices: t[2] })),
            (r = { ...e.defaultOptions, ...r });
          const n = r.positions || new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]),
            o = r.uvs || new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]),
            h = r.indices || new Uint32Array([0, 1, 2, 0, 2, 3]),
            l = r.shrinkBuffersToFit;
          super({
            attributes: {
              aPosition: {
                buffer: new i.h({
                  data: n,
                  label: "attribute-mesh-positions",
                  shrinkToFit: l,
                  usage: s.S.VERTEX | s.S.COPY_DST,
                }),
                format: "float32x2",
                stride: 8,
                offset: 0,
              },
              aUV: {
                buffer: new i.h({
                  data: o,
                  label: "attribute-mesh-uvs",
                  shrinkToFit: l,
                  usage: s.S.VERTEX | s.S.COPY_DST,
                }),
                format: "float32x2",
                stride: 8,
                offset: 0,
              },
            },
            indexBuffer: new i.h({
              data: h,
              label: "index-mesh-buffer",
              shrinkToFit: l,
              usage: s.S.INDEX | s.S.COPY_DST,
            }),
            topology: r.topology,
          }),
            (this.batchMode = "auto");
        }
        get positions() {
          return this.attributes.aPosition.buffer.data;
        }
        set positions(e) {
          this.attributes.aPosition.buffer.data = e;
        }
        get uvs() {
          return this.attributes.aUV.buffer.data;
        }
        set uvs(e) {
          this.attributes.aUV.buffer.data = e;
        }
        get indices() {
          return this.indexBuffer.data;
        }
        set indices(e) {
          this.indexBuffer.data = e;
        }
      };
      o.defaultOptions = { topology: "triangle-list", shrinkBuffersToFit: !1 };
      let h = o;
    },
    7252: (e, t, r) => {
      var i = r(8507),
        s = r(8218),
        n = r(8734),
        a = r(4670),
        o = r(5060);
      const h = class e extends o.u {
        constructor(...e) {
          super({});
          let t = e[0] ?? {};
          "number" == typeof t &&
            ((0, a.t)(
              a.l,
              "PlaneGeometry constructor changed please use { width, height, verticesX, verticesY } instead"
            ),
            (t = { width: t, height: e[1], verticesX: e[2], verticesY: e[3] })),
            this.build(t);
        }
        build(t) {
          (t = { ...e.defaultOptions, ...t }),
            (this.verticesX = this.verticesX ?? t.verticesX),
            (this.verticesY = this.verticesY ?? t.verticesY),
            (this.width = this.width ?? t.width),
            (this.height = this.height ?? t.height);
          const r = this.verticesX * this.verticesY,
            i = [],
            s = [],
            n = [],
            a = this.verticesX - 1,
            o = this.verticesY - 1,
            h = this.width / a,
            l = this.height / o;
          for (let e = 0; e < r; e++) {
            const t = e % this.verticesX,
              r = (e / this.verticesX) | 0;
            i.push(t * h, r * l), s.push(t / a, r / o);
          }
          const d = a * o;
          for (let e = 0; e < d; e++) {
            const t = e % a,
              r = (e / a) | 0,
              i = r * this.verticesX + t,
              s = r * this.verticesX + t + 1,
              o = (r + 1) * this.verticesX + t,
              h = (r + 1) * this.verticesX + t + 1;
            n.push(i, s, o, s, h, o);
          }
          (this.buffers[0].data = new Float32Array(i)),
            (this.buffers[1].data = new Float32Array(s)),
            (this.indexBuffer.data = new Uint32Array(n)),
            this.buffers[0].update(),
            this.buffers[1].update(),
            this.indexBuffer.update();
        }
      };
      h.defaultOptions = {
        width: 100,
        height: 100,
        verticesX: 10,
        verticesY: 10,
      };
      let l = h;
      const d = class e extends l {
        constructor(t = {}) {
          super({
            width: (t = { ...e.defaultOptions, ...t }).width,
            height: t.height,
            verticesX: 4,
            verticesY: 4,
          }),
            this.update(t);
        }
        update(e) {
          (this.width = e.width ?? this.width),
            (this.height = e.height ?? this.height),
            (this._originalWidth = e.originalWidth ?? this._originalWidth),
            (this._originalHeight = e.originalHeight ?? this._originalHeight),
            (this._leftWidth = e.leftWidth ?? this._leftWidth),
            (this._rightWidth = e.rightWidth ?? this._rightWidth),
            (this._topHeight = e.topHeight ?? this._topHeight),
            (this._bottomHeight = e.bottomHeight ?? this._bottomHeight),
            this.updateUvs(),
            this.updatePositions();
        }
        updatePositions() {
          const e = this.positions,
            t = this._leftWidth + this._rightWidth,
            r = this.width > t ? 1 : this.width / t,
            i = this._topHeight + this._bottomHeight,
            s = this.height > i ? 1 : this.height / i,
            n = Math.min(r, s);
          (e[9] = e[11] = e[13] = e[15] = this._topHeight * n),
            (e[17] =
              e[19] =
              e[21] =
              e[23] =
                this.height - this._bottomHeight * n),
            (e[25] = e[27] = e[29] = e[31] = this.height),
            (e[2] = e[10] = e[18] = e[26] = this._leftWidth * n),
            (e[4] = e[12] = e[20] = e[28] = this.width - this._rightWidth * n),
            (e[6] = e[14] = e[22] = e[30] = this.width),
            this.getBuffer("aPosition").update();
        }
        updateUvs() {
          const e = this.uvs;
          (e[0] = e[8] = e[16] = e[24] = 0),
            (e[1] = e[3] = e[5] = e[7] = 0),
            (e[6] = e[14] = e[22] = e[30] = 1),
            (e[25] = e[27] = e[29] = e[31] = 1);
          const t = 1 / this._originalWidth,
            r = 1 / this._originalHeight;
          (e[2] = e[10] = e[18] = e[26] = t * this._leftWidth),
            (e[9] = e[11] = e[13] = e[15] = r * this._topHeight),
            (e[4] = e[12] = e[20] = e[28] = 1 - t * this._rightWidth),
            (e[17] = e[19] = e[21] = e[23] = 1 - r * this._bottomHeight),
            this.getBuffer("aUV").update();
        }
      };
      d.defaultOptions = {
        width: 100,
        height: 100,
        leftWidth: 10,
        topHeight: 10,
        rightWidth: 10,
        bottomHeight: 10,
        originalWidth: 100,
        originalHeight: 100,
      };
      let u = d;
      class c {
        constructor(e) {
          (this._gpuSpriteHash = Object.create(null)), (this._renderer = e);
        }
        addRenderable(e, t) {
          const r = this._getGpuSprite(e);
          e._didSpriteUpdate && this._updateBatchableSprite(e, r),
            this._renderer.renderPipes.batch.addToBatch(r);
        }
        updateRenderable(e) {
          const t = this._gpuSpriteHash[e.uid];
          e._didSpriteUpdate && this._updateBatchableSprite(e, t),
            t.batcher.updateElement(t);
        }
        validateRenderable(e) {
          const t = e._texture,
            r = this._getGpuSprite(e);
          return (
            r.texture._source !== t._source &&
            !r.batcher.checkAndUpdateTexture(r, t)
          );
        }
        destroyRenderable(e) {
          const t = this._gpuSpriteHash[e.uid];
          s.Z.return(t), (this._gpuSpriteHash[e.uid] = null);
        }
        _updateBatchableSprite(e, t) {
          (e._didSpriteUpdate = !1),
            t.geometry.update(e),
            (t.texture = e._texture);
        }
        _getGpuSprite(e) {
          return this._gpuSpriteHash[e.uid] || this._initGPUSprite(e);
        }
        _initGPUSprite(e) {
          const t = new n.U();
          return (
            (t.geometry = new u()),
            (t.mesh = e),
            (t.texture = e._texture),
            (t.roundPixels = this._renderer._roundPixels | e._roundPixels),
            (this._gpuSpriteHash[e.uid] = t),
            e.on("destroyed", () => {
              this.destroyRenderable(e);
            }),
            t
          );
        }
        destroy() {
          for (const e in this._gpuSpriteHash) {
            this._gpuSpriteHash[e].geometry.destroy();
          }
          (this._gpuSpriteHash = null), (this._renderer = null);
        }
      }
      (c.extension = {
        type: [i.Ag.WebGLPipes, i.Ag.WebGPUPipes, i.Ag.CanvasPipes],
        name: "nineSliceSprite",
      }),
        i.XO.add(c);
    },
    8723: (e, t, r) => {
      var i = r(8507),
        s = r(7547),
        n = r(5099),
        a = r(2760),
        o = r(8734),
        h = r(5060),
        l = r(9313),
        d = r(5611),
        u = r(2067),
        c = r(6665),
        p = r(8475),
        g = r(7222),
        f = r(4492);
      const m = {
          name: "tiling-bit",
          vertex: {
            header:
              "\n            struct TilingUniforms {\n                uMapCoord:mat3x3<f32>,\n                uClampFrame:vec4<f32>,\n                uClampOffset:vec2<f32>,\n                uTextureTransform:mat3x3<f32>,\n                uSizeAnchor:vec4<f32>\n            };\n\n            @group(2) @binding(0) var<uniform> tilingUniforms: TilingUniforms;\n            @group(2) @binding(1) var uTexture: texture_2d<f32>;\n            @group(2) @binding(2) var uSampler: sampler;\n        ",
            main: "\n            uv = (tilingUniforms.uTextureTransform * vec3(uv, 1.0)).xy;\n\n            position = (position - tilingUniforms.uSizeAnchor.zw) * tilingUniforms.uSizeAnchor.xy;\n        ",
          },
          fragment: {
            header:
              "\n            struct TilingUniforms {\n                uMapCoord:mat3x3<f32>,\n                uClampFrame:vec4<f32>,\n                uClampOffset:vec2<f32>,\n                uTextureTransform:mat3x3<f32>,\n                uSizeAnchor:vec4<f32>\n            };\n\n            @group(2) @binding(0) var<uniform> tilingUniforms: TilingUniforms;\n            @group(2) @binding(1) var uTexture: texture_2d<f32>;\n            @group(2) @binding(2) var uSampler: sampler;\n        ",
            main: "\n\n            var coord = vUV + ceil(tilingUniforms.uClampOffset - vUV);\n            coord = (tilingUniforms.uMapCoord * vec3(coord, 1.0)).xy;\n            var unclamped = coord;\n            coord = clamp(coord, tilingUniforms.uClampFrame.xy, tilingUniforms.uClampFrame.zw);\n\n            var bias = 0.;\n\n            if(unclamped.x == coord.x && unclamped.y == coord.y)\n            {\n                bias = -32.;\n            } \n\n            outColor = textureSampleBias(uTexture, uSampler, coord, bias);\n        ",
          },
        },
        x = {
          name: "tiling-bit",
          vertex: {
            header:
              "\n            uniform mat3 uTextureTransform;\n            uniform vec4 uSizeAnchor;\n        \n        ",
            main: "\n            uv = (uTextureTransform * vec3(aUV, 1.0)).xy;\n\n            position = (position - uSizeAnchor.zw) * uSizeAnchor.xy;\n        ",
          },
          fragment: {
            header:
              "\n            uniform sampler2D uTexture;\n            uniform mat3 uMapCoord;\n            uniform vec4 uClampFrame;\n            uniform vec2 uClampOffset;\n        ",
            main: "\n\n        vec2 coord = vUV + ceil(uClampOffset - vUV);\n        coord = (uMapCoord * vec3(coord, 1.0)).xy;\n        vec2 unclamped = coord;\n        coord = clamp(coord, uClampFrame.xy, uClampFrame.zw);\n        \n        outColor = texture(uTexture, coord, unclamped == coord ? 0.0 : -32.0);// lod-bias very negative to force lod 0\n    \n        ",
          },
        };
      let _, b;
      class y extends p.M {
        constructor() {
          _ ??
            (_ = (0, d.v)({
              name: "tiling-sprite-shader",
              bits: [u.Ls, m, c.b],
            })),
            b ??
              (b = (0, d.I)({
                name: "tiling-sprite-shader",
                bits: [u.mA, x, c.m],
              }));
          const e = new g.k({
            uMapCoord: { value: new l.u(), type: "mat3x3<f32>" },
            uClampFrame: {
              value: new Float32Array([0, 0, 1, 1]),
              type: "vec4<f32>",
            },
            uClampOffset: {
              value: new Float32Array([0, 0]),
              type: "vec2<f32>",
            },
            uTextureTransform: { value: new l.u(), type: "mat3x3<f32>" },
            uSizeAnchor: {
              value: new Float32Array([100, 100, 0.5, 0.5]),
              type: "vec4<f32>",
            },
          });
          super({
            glProgram: b,
            gpuProgram: _,
            resources: {
              localUniforms: new g.k({
                uTransformMatrix: { value: new l.u(), type: "mat3x3<f32>" },
                uColor: {
                  value: new Float32Array([1, 1, 1, 1]),
                  type: "vec4<f32>",
                },
                uRound: { value: 0, type: "f32" },
              }),
              tilingUniforms: e,
              uTexture: f.g.EMPTY.source,
              uSampler: f.g.EMPTY.source.style,
            },
          });
        }
        updateUniforms(e, t, r, i, s, n) {
          const a = this.resources.tilingUniforms,
            o = n.width,
            h = n.height,
            l = n.textureMatrix,
            d = a.uniforms.uTextureTransform;
          d.set(
            (r.a * o) / e,
            (r.b * o) / t,
            (r.c * h) / e,
            (r.d * h) / t,
            r.tx / e,
            r.ty / t
          ),
            d.invert(),
            (a.uniforms.uMapCoord = l.mapCoord),
            (a.uniforms.uClampFrame = l.uClampFrame),
            (a.uniforms.uClampOffset = l.uClampOffset),
            (a.uniforms.uTextureTransform = d),
            (a.uniforms.uSizeAnchor[0] = e),
            (a.uniforms.uSizeAnchor[1] = t),
            (a.uniforms.uSizeAnchor[2] = i),
            (a.uniforms.uSizeAnchor[3] = s),
            n &&
              ((this.resources.uTexture = n.source),
              (this.resources.uSampler = n.source.style));
        }
      }
      class T extends h.u {
        constructor() {
          super({
            positions: new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]),
            uvs: new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]),
            indices: new Uint32Array([0, 1, 2, 0, 2, 3]),
          });
        }
      }
      const v = new T();
      class w {
        constructor(e) {
          (this._tilingSpriteDataHash = Object.create(null)),
            (this._renderer = e);
        }
        validateRenderable(e) {
          const t = this._getTilingSpriteData(e),
            r = t.canBatch;
          this._updateCanBatch(e);
          const i = t.canBatch;
          if (i && i === r) {
            const { batchableMesh: r } = t;
            if (r.texture._source !== e.texture._source)
              return !r.batcher.checkAndUpdateTexture(r, e.texture);
          }
          return r !== i;
        }
        addRenderable(e, t) {
          const r = this._renderer.renderPipes.batch;
          this._updateCanBatch(e);
          const i = this._getTilingSpriteData(e),
            { geometry: s, canBatch: n } = i;
          if (n) {
            i.batchableMesh || (i.batchableMesh = new o.U());
            const t = i.batchableMesh;
            e._didTilingSpriteUpdate &&
              ((e._didTilingSpriteUpdate = !1),
              this._updateBatchableMesh(e),
              (t.geometry = s),
              (t.mesh = e),
              (t.texture = e._texture)),
              (t.roundPixels = this._renderer._roundPixels | e._roundPixels),
              r.addToBatch(t);
          } else
            r.break(t),
              i.shader || (i.shader = new y()),
              this.updateRenderable(e),
              t.add(e);
        }
        execute(e) {
          const { shader: t } = this._tilingSpriteDataHash[e.uid];
          t.groups[0] = this._renderer.globalUniforms.bindGroup;
          const r = t.resources.localUniforms.uniforms;
          (r.uTransformMatrix = e.groupTransform),
            (r.uRound = this._renderer._roundPixels | e._roundPixels),
            (0, a.V)(e.groupColorAlpha, r.uColor, 0),
            this._renderer.encoder.draw({
              geometry: v,
              shader: t,
              state: s.U.default2d,
            });
        }
        updateRenderable(e) {
          const t = this._getTilingSpriteData(e),
            { canBatch: r } = t;
          if (r) {
            const { batchableMesh: r } = t;
            e._didTilingSpriteUpdate && this._updateBatchableMesh(e),
              r.batcher.updateElement(r);
          } else if (e._didTilingSpriteUpdate) {
            const { shader: r } = t;
            r.updateUniforms(
              e.width,
              e.height,
              e._tileTransform.matrix,
              e.anchor.x,
              e.anchor.y,
              e.texture
            );
          }
          e._didTilingSpriteUpdate = !1;
        }
        destroyRenderable(e) {
          const t = this._getTilingSpriteData(e);
          (t.batchableMesh = null),
            t.shader?.destroy(),
            (this._tilingSpriteDataHash[e.uid] = null);
        }
        _getTilingSpriteData(e) {
          return (
            this._tilingSpriteDataHash[e.uid] || this._initTilingSpriteData(e)
          );
        }
        _initTilingSpriteData(e) {
          const t = new h.u({
            indices: v.indices,
            positions: v.positions.slice(),
            uvs: v.uvs.slice(),
          });
          return (
            (this._tilingSpriteDataHash[e.uid] = {
              canBatch: !0,
              renderable: e,
              geometry: t,
            }),
            e.on("destroyed", () => {
              this.destroyRenderable(e);
            }),
            this._tilingSpriteDataHash[e.uid]
          );
        }
        _updateBatchableMesh(e) {
          const t = this._getTilingSpriteData(e),
            { geometry: r } = t,
            i = e.texture.source.style;
          "repeat" !== i.addressMode &&
            ((i.addressMode = "repeat"), i.update()),
            (function (e, t) {
              const r = e.texture,
                i = r.frame.width,
                s = r.frame.height;
              let n = 0,
                a = 0;
              e._applyAnchorToTexture && ((n = e.anchor.x), (a = e.anchor.y)),
                (t[0] = t[6] = -n),
                (t[2] = t[4] = 1 - n),
                (t[1] = t[3] = -a),
                (t[5] = t[7] = 1 - a);
              const o = l.u.shared;
              o.copyFrom(e._tileTransform.matrix),
                (o.tx /= e.width),
                (o.ty /= e.height),
                o.invert(),
                o.scale(e.width / i, e.height / s),
                (function (e, t, r, i) {
                  let s = 0;
                  const n = e.length / (t || 2),
                    a = i.a,
                    o = i.b,
                    h = i.c,
                    l = i.d,
                    d = i.tx,
                    u = i.ty;
                  for (r *= t; s < n; ) {
                    const i = e[r],
                      n = e[r + 1];
                    (e[r] = a * i + h * n + d),
                      (e[r + 1] = o * i + l * n + u),
                      (r += t),
                      s++;
                  }
                })(t, 2, 0, o);
            })(e, r.uvs),
            (function (e, t) {
              const r = e.anchor.x,
                i = e.anchor.y;
              (t[0] = -r * e.width),
                (t[1] = -i * e.height),
                (t[2] = (1 - r) * e.width),
                (t[3] = -i * e.height),
                (t[4] = (1 - r) * e.width),
                (t[5] = (1 - i) * e.height),
                (t[6] = -r * e.width),
                (t[7] = (1 - i) * e.height);
            })(e, r.positions);
        }
        destroy() {
          for (const e in this._tilingSpriteDataHash)
            this.destroyRenderable(this._tilingSpriteDataHash[e].renderable);
          (this._tilingSpriteDataHash = null), (this._renderer = null);
        }
        _updateCanBatch(e) {
          const t = this._getTilingSpriteData(e),
            r = e.texture;
          let i = !0;
          return (
            this._renderer.type === n.W.WEBGL &&
              (i = this._renderer.context.supports.nonPowOf2wrapping),
            (t.canBatch =
              r.textureMatrix.isSimple && (i || r.source.isPowerOfTwo)),
            t.canBatch
          );
        }
      }
      (w.extension = {
        type: [i.Ag.WebGLPipes, i.Ag.WebGPUPipes, i.Ag.CanvasPipes],
        name: "tilingSprite",
      }),
        i.XO.add(w);
    },
    8883: (e, t, r) => {
      var i = r(8507),
        s = r(4589),
        n = r(2233),
        a = r(1761),
        o = r(2927),
        h = r(9252),
        l = r(4492),
        d = r(4486),
        u = r(4670);
      class c extends d.A {
        constructor() {
          super(...arguments),
            (this.chars = Object.create(null)),
            (this.lineHeight = 0),
            (this.fontFamily = ""),
            (this.fontMetrics = { fontSize: 0, ascent: 0, descent: 0 }),
            (this.baseLineOffset = 0),
            (this.distanceField = { type: "none", range: 0 }),
            (this.pages = []),
            (this.baseMeasurementFontSize = 100),
            (this.baseRenderedFontSize = 100);
        }
        get font() {
          return (
            (0, u.t)(
              u.l,
              "BitmapFont.font is deprecated, please use BitmapFont.fontFamily instead."
            ),
            this.fontFamily
          );
        }
        get pageTextures() {
          return (
            (0, u.t)(
              u.l,
              "BitmapFont.pageTextures is deprecated, please use BitmapFont.pages instead."
            ),
            this.pages
          );
        }
        get size() {
          return (
            (0, u.t)(
              u.l,
              "BitmapFont.size is deprecated, please use BitmapFont.fontMetrics.fontSize instead."
            ),
            this.fontMetrics.fontSize
          );
        }
        get distanceFieldRange() {
          return (
            (0, u.t)(
              u.l,
              "BitmapFont.distanceFieldRange is deprecated, please use BitmapFont.distanceField.range instead."
            ),
            this.distanceField.range
          );
        }
        get distanceFieldType() {
          return (
            (0, u.t)(
              u.l,
              "BitmapFont.distanceFieldType is deprecated, please use BitmapFont.distanceField.type instead."
            ),
            this.distanceField.type
          );
        }
        destroy(e = !1) {
          this.emit("destroy", this), this.removeAllListeners();
          for (const e in this.chars) this.chars[e].texture.destroy();
          (this.chars = null),
            e &&
              (this.pages.forEach((e) => e.texture.destroy(!0)),
              (this.pages = null));
        }
      }
      var p = r(1979),
        g = r(8291),
        f = r(2577),
        m = r(7608),
        x = r(8293),
        _ = r(4016),
        b = r(1242),
        y = r(3548);
      function T(e) {
        if ("" === e) return [];
        "string" == typeof e && (e = [e]);
        const t = [];
        for (let r = 0, i = e.length; r < i; r++) {
          const i = e[r];
          if (Array.isArray(i)) {
            if (2 !== i.length)
              throw new Error(
                `[BitmapFont]: Invalid character range length, expecting 2 got ${i.length}.`
              );
            if (0 === i[0].length || 0 === i[1].length)
              throw new Error("[BitmapFont]: Invalid character delimiter.");
            const e = i[0].charCodeAt(0),
              r = i[1].charCodeAt(0);
            if (r < e)
              throw new Error("[BitmapFont]: Invalid character range.");
            for (let i = e, s = r; i <= s; i++) t.push(String.fromCharCode(i));
          } else t.push(...Array.from(i));
        }
        if (0 === t.length)
          throw new Error("[BitmapFont]: Empty set when resolving characters.");
        return t;
      }
      class v extends c {
        constructor(e) {
          super(),
            (this.resolution = 1),
            (this.pages = []),
            (this._padding = 4),
            (this._measureCache = Object.create(null)),
            (this._currentChars = []),
            (this._currentX = 0),
            (this._currentY = 0),
            (this._currentPageIndex = -1),
            (this._skipKerning = !1);
          const t = e,
            r = t.style.clone();
          t.overrideFill &&
            ((r._fill.color = 16777215),
            (r._fill.alpha = 1),
            (r._fill.texture = l.g.WHITE),
            (r._fill.fill = null));
          const i = r.fontSize;
          r.fontSize = this.baseMeasurementFontSize;
          const s = (0, b.Z)(r);
          t.overrideSize
            ? r._stroke && (r._stroke.width *= this.baseRenderedFontSize / i)
            : (r.fontSize = this.baseRenderedFontSize = i),
            (this._style = r),
            (this._skipKerning = t.skipKerning ?? !1),
            (this.resolution = t.resolution ?? 1),
            (this._padding = t.padding ?? 4),
            (this.fontMetrics = _.P.measureFont(s)),
            (this.lineHeight =
              r.lineHeight || this.fontMetrics.fontSize || r.fontSize);
        }
        ensureCharacters(e) {
          const t = T(e)
            .filter((e) => !this._currentChars.includes(e))
            .filter((e, t, r) => r.indexOf(e) === t);
          if (!t.length) return;
          let r;
          (this._currentChars = [...this._currentChars, ...t]),
            (r =
              -1 === this._currentPageIndex
                ? this._nextPage()
                : this.pages[this._currentPageIndex]);
          let { canvas: i, context: s } = r.canvasAndContext,
            n = r.texture.source;
          const a = this._style;
          let o = this._currentX,
            d = this._currentY;
          const u = this.baseRenderedFontSize / this.baseMeasurementFontSize,
            c = this._padding * u,
            p = "italic" === a.fontStyle ? 2 : 1;
          let g = 0,
            f = !1;
          for (let e = 0; e < t.length; e++) {
            const r = t[e],
              m = _.P.measureText(r, a, i, !1);
            m.lineHeight = m.height;
            const x = p * m.width * u,
              b = x + 2 * c,
              y = m.height * u + 2 * c;
            if (
              ((f = !1),
              "\n" !== r &&
                "\r" !== r &&
                "\t" !== r &&
                " " !== r &&
                ((f = !0), (g = Math.ceil(Math.max(y, g)))),
              o + b > 512 && ((d += g), (g = y), (o = 0), d + g > 512))
            ) {
              n.update();
              const e = this._nextPage();
              (i = e.canvasAndContext.canvas),
                (s = e.canvasAndContext.context),
                (n = e.texture.source),
                (d = 0);
            }
            const T =
              x / u - (a.dropShadow?.distance ?? 0) - (a._stroke?.width ?? 0);
            if (
              ((this.chars[r] = {
                id: r.codePointAt(0),
                xOffset: -this._padding,
                yOffset: -this._padding,
                xAdvance: T,
                kerning: {},
              }),
              f)
            ) {
              this._drawGlyph(s, m, o + c, d + c, u, a);
              const e = n.width * u,
                t = n.height * u,
                i = new h.M(
                  (o / e) * n.width,
                  (d / t) * n.height,
                  (b / e) * n.width,
                  (y / t) * n.height
                );
              (this.chars[r].texture = new l.g({ source: n, frame: i })),
                (o += Math.ceil(b));
            }
          }
          n.update(),
            (this._currentX = o),
            (this._currentY = d),
            this._skipKerning && this._applyKerning(t, s);
        }
        get pageTextures() {
          return (
            (0, u.t)(
              u.l,
              "BitmapFont.pageTextures is deprecated, please use BitmapFont.pages instead."
            ),
            this.pages
          );
        }
        _applyKerning(e, t) {
          const r = this._measureCache;
          for (let i = 0; i < e.length; i++) {
            const s = e[i];
            for (let e = 0; e < this._currentChars.length; e++) {
              const i = this._currentChars[e];
              let n = r[s];
              n || (n = r[s] = t.measureText(s).width);
              let a = r[i];
              a || (a = r[i] = t.measureText(i).width);
              let o = t.measureText(s + i).width,
                h = o - (n + a);
              h && (this.chars[s].kerning[i] = h),
                (o = t.measureText(s + i).width),
                (h = o - (n + a)),
                h && (this.chars[i].kerning[s] = h);
            }
          }
        }
        _nextPage() {
          this._currentPageIndex++;
          const e = this.resolution,
            t = m.N.getOptimalCanvasAndContext(512, 512, e);
          this._setupContext(t.context, this._style, e);
          const r =
              e * (this.baseRenderedFontSize / this.baseMeasurementFontSize),
            i = {
              canvasAndContext: t,
              texture: new l.g({
                source: new x.b({
                  resource: t.canvas,
                  resolution: r,
                  alphaMode: "premultiply-alpha-on-upload",
                }),
              }),
            };
          return (this.pages[this._currentPageIndex] = i), i;
        }
        _setupContext(e, t, r) {
          (t.fontSize = this.baseRenderedFontSize),
            e.scale(r, r),
            (e.font = (0, b.Z)(t)),
            (t.fontSize = this.baseMeasurementFontSize),
            (e.textBaseline = t.textBaseline);
          const i = t._stroke,
            s = i?.width ?? 0;
          if (
            (i &&
              ((e.lineWidth = s),
              (e.lineJoin = i.join),
              (e.miterLimit = i.miterLimit),
              (e.strokeStyle = (0, y.r)(i, e))),
            t._fill && (e.fillStyle = (0, y.r)(t._fill, e)),
            t.dropShadow)
          ) {
            const i = t.dropShadow,
              s = f.Q.shared.setValue(i.color).toArray(),
              n = i.blur * r,
              a = i.distance * r;
            (e.shadowColor = `rgba(${255 * s[0]},${255 * s[1]},${255 * s[2]},${
              i.alpha
            })`),
              (e.shadowBlur = n),
              (e.shadowOffsetX = Math.cos(i.angle) * a),
              (e.shadowOffsetY = Math.sin(i.angle) * a);
          } else
            (e.shadowColor = "black"),
              (e.shadowBlur = 0),
              (e.shadowOffsetX = 0),
              (e.shadowOffsetY = 0);
        }
        _drawGlyph(e, t, r, i, s, n) {
          const a = t.text,
            o = t.fontProperties,
            h = n._stroke,
            l = (h?.width ?? 0) * s,
            d = r + l / 2,
            u = i - l / 2,
            c = o.descent * s,
            p = t.lineHeight * s;
          n.stroke && l && e.strokeText(a, d, u + p - c),
            n._fill && e.fillText(a, d, u + p - c);
        }
        destroy() {
          super.destroy();
          for (let e = 0; e < this.pages.length; e++) {
            const { canvasAndContext: t, texture: r } = this.pages[e];
            m.N.returnCanvasAndContext(t), r.destroy(!0);
          }
          this.pages = null;
        }
      }
      function w(e, t, r) {
        const i = {
          width: 0,
          height: 0,
          offsetY: 0,
          scale: t.fontSize / r.baseMeasurementFontSize,
          lines: [
            {
              width: 0,
              charPositions: [],
              spaceWidth: 0,
              spacesIndex: [],
              chars: [],
            },
          ],
        };
        i.offsetY = r.baseLineOffset;
        let s = i.lines[0],
          n = null,
          a = !0;
        const o = {
            spaceWord: !1,
            width: 0,
            start: 0,
            index: 0,
            positions: [],
            chars: [],
          },
          h = (e) => {
            const t = s.width;
            for (let r = 0; r < o.index; r++) {
              const i = e.positions[r];
              s.chars.push(e.chars[r]), s.charPositions.push(i + t);
            }
            (s.width += e.width),
              (a = !1),
              (o.width = 0),
              (o.index = 0),
              (o.chars.length = 0);
          },
          l = () => {
            let e = s.chars.length - 1,
              t = s.chars[e];
            for (; " " === t; )
              (s.width -= r.chars[t].xAdvance), (t = s.chars[--e]);
            (i.width = Math.max(i.width, s.width)),
              (s = {
                width: 0,
                charPositions: [],
                chars: [],
                spaceWidth: 0,
                spacesIndex: [],
              }),
              (a = !0),
              i.lines.push(s),
              (i.height += r.lineHeight);
          },
          d = r.baseMeasurementFontSize / t.fontSize,
          u = t.letterSpacing * d,
          c = t.wordWrapWidth * d;
        for (let i = 0; i < e.length + 1; i++) {
          let d;
          const p = i === e.length;
          p || (d = e[i]);
          const g = r.chars[d] || r.chars[" "];
          if (/(?:\s)/.test(d) || "\r" === d || "\n" === d || p) {
            if (
              (!a && t.wordWrap && s.width + o.width - u > c
                ? (l(), h(o), p || s.charPositions.push(0))
                : ((o.start = s.width), h(o), p || s.charPositions.push(0)),
              "\r" === d || "\n" === d)
            )
              0 !== s.width && l();
            else if (!p) {
              const e = g.xAdvance + (g.kerning[n] || 0) + u;
              (s.width += e),
                (s.spaceWidth = e),
                s.spacesIndex.push(s.charPositions.length),
                s.chars.push(d);
            }
          } else {
            const e = g.kerning[n] || 0,
              t = g.xAdvance + e + u;
            (o.positions[o.index++] = o.width + e),
              o.chars.push(d),
              (o.width += t);
          }
          n = d;
        }
        return (
          l(),
          "center" === t.align
            ? (function (e) {
                for (let t = 0; t < e.lines.length; t++) {
                  const r = e.lines[t],
                    i = e.width / 2 - r.width / 2;
                  for (let e = 0; e < r.charPositions.length; e++)
                    r.charPositions[e] += i;
                }
              })(i)
            : "right" === t.align
            ? (function (e) {
                for (let t = 0; t < e.lines.length; t++) {
                  const r = e.lines[t],
                    i = e.width - r.width;
                  for (let e = 0; e < r.charPositions.length; e++)
                    r.charPositions[e] += i;
                }
              })(i)
            : "justify" === t.align &&
              (function (e) {
                const t = e.width;
                for (let r = 0; r < e.lines.length; r++) {
                  const i = e.lines[r];
                  let s = 0,
                    n = i.spacesIndex[s++],
                    a = 0;
                  const o = i.spacesIndex.length,
                    h = (t - i.width) / o;
                  for (let e = 0; e < i.charPositions.length; e++)
                    e === n && ((n = i.spacesIndex[s++]), (a += h)),
                      (i.charPositions[e] += a);
                }
              })(i),
          i
        );
      }
      const S = new (class {
        constructor() {
          (this.ALPHA = [["a", "z"], ["A", "Z"], " "]),
            (this.NUMERIC = [["0", "9"]]),
            (this.ALPHANUMERIC = [["a", "z"], ["A", "Z"], ["0", "9"], " "]),
            (this.ASCII = [[" ", "~"]]),
            (this.defaultOptions = {
              chars: this.ALPHANUMERIC,
              resolution: 1,
              padding: 4,
              skipKerning: !1,
            });
        }
        getFont(e, t) {
          let r = `${t.fontFamily}-bitmap`,
            i = !0;
          if (
            (t._fill.fill && ((r += t._fill.fill.uid), (i = !1)), !p.l.has(r))
          ) {
            const e = new v({
              style: t,
              overrideFill: i,
              overrideSize: !0,
              ...this.defaultOptions,
            });
            e.once("destroy", () => p.l.remove(r)), p.l.set(r, e);
          }
          const s = p.l.get(r);
          return s.ensureCharacters?.(e), s;
        }
        getLayout(e, t) {
          const r = this.getFont(e, t);
          return w(e.split(""), t, r);
        }
        measureText(e, t) {
          return this.getLayout(e, t);
        }
        install(...e) {
          let t = e[0];
          "string" == typeof t &&
            ((t = {
              name: t,
              style: e[1],
              chars: e[2]?.chars,
              resolution: e[2]?.resolution,
              padding: e[2]?.padding,
              skipKerning: e[2]?.skipKerning,
            }),
            (0, u.t)(
              u.l,
              "BitmapFontManager.install(name, style, options) is deprecated, use BitmapFontManager.install({name, style, ...options})"
            ));
          const r = t?.name;
          if (!r)
            throw new Error("[BitmapFontManager] Property `name` is required.");
          t = { ...this.defaultOptions, ...t };
          const i = t.style,
            s = i instanceof g.x ? i : new g.x(i),
            n = null !== s._fill.fill && void 0 !== s._fill.fill,
            a = new v({
              style: s,
              overrideFill: n,
              skipKerning: t.skipKerning,
              padding: t.padding,
              resolution: t.resolution,
              overrideSize: !1,
            }),
            o = T(t.chars);
          return (
            a.ensureCharacters(o.join("")),
            p.l.set(`${r}-bitmap`, a),
            a.once("destroy", () => p.l.remove(`${r}-bitmap`)),
            a
          );
        }
        uninstall(e) {
          const t = `${e}-bitmap`,
            r = p.l.get(t);
          r && (p.l.remove(t), r.destroy());
        }
      })();
      class C extends c {
        constructor(e, t) {
          super();
          const { textures: r, data: i } = e;
          Object.keys(i.pages).forEach((e) => {
            const t = i.pages[parseInt(e, 10)],
              s = r[t.id];
            this.pages.push({ texture: s });
          }),
            Object.keys(i.chars).forEach((e) => {
              const t = i.chars[e],
                s = r[t.page].source,
                n = new h.M(t.x, t.y, t.width, t.height),
                a = new l.g({ source: s, frame: n });
              this.chars[e] = {
                id: e.codePointAt(0),
                xOffset: t.xOffset,
                yOffset: t.yOffset,
                xAdvance: t.xAdvance,
                kerning: t.kerning ?? {},
                texture: a,
              };
            }),
            (this.baseRenderedFontSize = i.fontSize),
            (this.baseMeasurementFontSize = i.fontSize),
            (this.fontMetrics = {
              ascent: 0,
              descent: 0,
              fontSize: i.fontSize,
            }),
            (this.baseLineOffset = i.baseLineOffset),
            (this.lineHeight = i.lineHeight),
            (this.fontFamily = i.fontFamily),
            (this.distanceField = i.distanceField ?? {
              type: "none",
              range: 0,
            }),
            (this.url = t);
        }
        destroy() {
          super.destroy();
          for (let e = 0; e < this.pages.length; e++) {
            const { texture: t } = this.pages[e];
            t.destroy(!0);
          }
          this.pages = null;
        }
        static install(e) {
          S.install(e);
        }
        static uninstall(e) {
          S.uninstall(e);
        }
      }
      const A = {
          test: (e) => "string" == typeof e && e.startsWith("info face="),
          parse(e) {
            const t = e.match(/^[a-z]+\s+.+$/gm),
              r = {
                info: [],
                common: [],
                page: [],
                char: [],
                chars: [],
                kerning: [],
                kernings: [],
                distanceField: [],
              };
            for (const e in t) {
              const i = t[e].match(/^[a-z]+/gm)[0],
                s = t[e].match(/[a-zA-Z]+=([^\s"']+|"([^"]*)")/gm),
                n = {};
              for (const e in s) {
                const t = s[e].split("="),
                  r = t[0],
                  i = t[1].replace(/"/gm, ""),
                  a = parseFloat(i),
                  o = isNaN(a) ? i : a;
                n[r] = o;
              }
              r[i].push(n);
            }
            const i = {
                chars: {},
                pages: [],
                lineHeight: 0,
                fontSize: 0,
                fontFamily: "",
                distanceField: null,
                baseLineOffset: 0,
              },
              [s] = r.info,
              [n] = r.common,
              [a] = r.distanceField ?? [];
            a &&
              (i.distanceField = {
                range: parseInt(a.distanceRange, 10),
                type: a.fieldType,
              }),
              (i.fontSize = parseInt(s.size, 10)),
              (i.fontFamily = s.face),
              (i.lineHeight = parseInt(n.lineHeight, 10));
            const o = r.page;
            for (let e = 0; e < o.length; e++)
              i.pages.push({ id: parseInt(o[e].id, 10) || 0, file: o[e].file });
            const h = {};
            i.baseLineOffset = i.lineHeight - parseInt(n.base, 10);
            const l = r.char;
            for (let e = 0; e < l.length; e++) {
              const t = l[e],
                r = parseInt(t.id, 10);
              let s = t.letter ?? t.char ?? String.fromCharCode(r);
              "space" === s && (s = " "),
                (h[r] = s),
                (i.chars[s] = {
                  id: r,
                  page: parseInt(t.page, 10) || 0,
                  x: parseInt(t.x, 10),
                  y: parseInt(t.y, 10),
                  width: parseInt(t.width, 10),
                  height: parseInt(t.height, 10),
                  xOffset: parseInt(t.xoffset, 10),
                  yOffset: parseInt(t.yoffset, 10),
                  xAdvance: parseInt(t.xadvance, 10),
                  kerning: {},
                });
            }
            const d = r.kerning || [];
            for (let e = 0; e < d.length; e++) {
              const t = parseInt(d[e].first, 10),
                r = parseInt(d[e].second, 10),
                s = parseInt(d[e].amount, 10);
              i.chars[h[r]].kerning[h[t]] = s;
            }
            return i;
          },
        },
        P = {
          test(e) {
            const t = e;
            return (
              "string" != typeof t &&
              "getElementsByTagName" in t &&
              t.getElementsByTagName("page").length &&
              null !== t.getElementsByTagName("info")[0].getAttribute("face")
            );
          },
          parse(e) {
            const t = {
                chars: {},
                pages: [],
                lineHeight: 0,
                fontSize: 0,
                fontFamily: "",
                distanceField: null,
                baseLineOffset: 0,
              },
              r = e.getElementsByTagName("info")[0],
              i = e.getElementsByTagName("common")[0],
              s = e.getElementsByTagName("distanceField")[0];
            s &&
              (t.distanceField = {
                type: s.getAttribute("fieldType"),
                range: parseInt(s.getAttribute("distanceRange"), 10),
              });
            const n = e.getElementsByTagName("page"),
              a = e.getElementsByTagName("char"),
              o = e.getElementsByTagName("kerning");
            (t.fontSize = parseInt(r.getAttribute("size"), 10)),
              (t.fontFamily = r.getAttribute("face")),
              (t.lineHeight = parseInt(i.getAttribute("lineHeight"), 10));
            for (let e = 0; e < n.length; e++)
              t.pages.push({
                id: parseInt(n[e].getAttribute("id"), 10) || 0,
                file: n[e].getAttribute("file"),
              });
            const h = {};
            t.baseLineOffset =
              t.lineHeight - parseInt(i.getAttribute("base"), 10);
            for (let e = 0; e < a.length; e++) {
              const r = a[e],
                i = parseInt(r.getAttribute("id"), 10);
              let s =
                r.getAttribute("letter") ??
                r.getAttribute("char") ??
                String.fromCharCode(i);
              "space" === s && (s = " "),
                (h[i] = s),
                (t.chars[s] = {
                  id: i,
                  page: parseInt(r.getAttribute("page"), 10) || 0,
                  x: parseInt(r.getAttribute("x"), 10),
                  y: parseInt(r.getAttribute("y"), 10),
                  width: parseInt(r.getAttribute("width"), 10),
                  height: parseInt(r.getAttribute("height"), 10),
                  xOffset: parseInt(r.getAttribute("xoffset"), 10),
                  yOffset: parseInt(r.getAttribute("yoffset"), 10),
                  xAdvance: parseInt(r.getAttribute("xadvance"), 10),
                  kerning: {},
                });
            }
            for (let e = 0; e < o.length; e++) {
              const r = parseInt(o[e].getAttribute("first"), 10),
                i = parseInt(o[e].getAttribute("second"), 10),
                s = parseInt(o[e].getAttribute("amount"), 10);
              t.chars[h[i]].kerning[h[r]] = s;
            }
            return t;
          },
        },
        M = {
          test: (e) =>
            !("string" != typeof e || !e.includes("<font>")) &&
            P.test(a.e.get().parseXML(e)),
          parse: (e) => P.parse(a.e.get().parseXML(e)),
        },
        F = [".xml", ".fnt"],
        B = {
          extension: i.Ag.CacheParser,
          test: (e) => e instanceof C,
          getCacheableAssets(e, t) {
            const r = {};
            return (
              e.forEach((e) => {
                r[e] = t;
              }),
              (r[`${t.fontFamily}-bitmap`] = t),
              r
            );
          },
        },
        R = {
          extension: { type: i.Ag.LoadParser, priority: s.T.Normal },
          test: (e) => F.includes(o.A.extname(e).toLowerCase()),
          testParse: async (e) => A.test(e) || M.test(e),
          async parse(e, t, r) {
            const i = A.test(e) ? A.parse(e) : M.parse(e),
              { src: s } = t,
              { pages: a } = i,
              h = [];
            for (let e = 0; e < a.length; ++e) {
              const t = a[e].file;
              let r = o.A.join(o.A.dirname(s), t);
              (r = (0, n.Y)(r, s)), h.push(r);
            }
            const l = await r.load(h),
              d = h.map((e) => l[e]);
            return new C({ data: i, textures: d }, s);
          },
          async load(e, t) {
            const r = await a.e.get().fetch(e);
            return await r.text();
          },
          async unload(e, t, r) {
            await Promise.all(
              e.pages.map((e) => r.unload(e.texture.source._sourceOrigin))
            ),
              e.destroy();
          },
        };
      var k = r(8218),
        U = r(9408),
        z = r(9313),
        O = r(9104),
        I = r(5611),
        H = r(4459),
        W = r(4e3),
        G = r(6665),
        E = r(108),
        L = r(8475),
        D = r(7222);
      const X = {
          name: "local-uniform-msdf-bit",
          vertex: {
            header:
              "\n            struct LocalUniforms {\n                uColor:vec4<f32>,\n                uTransformMatrix:mat3x3<f32>,\n                uDistance: f32,\n                uRound:f32,\n            }\n\n            @group(2) @binding(0) var<uniform> localUniforms : LocalUniforms;\n        ",
            main: "\n            vColor *= localUniforms.uColor;\n            modelMatrix *= localUniforms.uTransformMatrix;\n        ",
            end: "\n            if(localUniforms.uRound == 1)\n            {\n                vPosition = vec4(roundPixels(vPosition.xy, globalUniforms.uResolution), vPosition.zw);\n            }\n        ",
          },
          fragment: {
            header:
              "\n            struct LocalUniforms {\n                uColor:vec4<f32>,\n                uTransformMatrix:mat3x3<f32>,\n                uDistance: f32\n            }\n\n            @group(2) @binding(0) var<uniform> localUniforms : LocalUniforms;\n         ",
            main: " \n            outColor = vColor * calculateMSDFAlpha(outColor, localUniforms.uDistance);\n        ",
          },
        },
        $ = {
          name: "local-uniform-msdf-bit",
          vertex: {
            header:
              "\n            uniform mat3 uTransformMatrix;\n            uniform vec4 uColor;\n            uniform float uRound;\n        ",
            main: "\n            vColor *= uColor;\n            modelMatrix *= uTransformMatrix;\n        ",
            end: "\n            if(uRound == 1.)\n            {\n                gl_Position.xy = roundPixels(gl_Position.xy, uResolution);\n            }\n        ",
          },
          fragment: {
            header: "\n            uniform float uDistance;\n         ",
            main: " \n            outColor = vColor * calculateMSDFAlpha(outColor, uDistance);\n        ",
          },
        },
        V = {
          name: "msdf-bit",
          fragment: {
            header:
              "\n            fn calculateMSDFAlpha(msdfColor:vec4<f32>, distance:f32) -> f32 {\n                \n                // MSDF\n                var median = msdfColor.r + msdfColor.g + msdfColor.b -\n                    min(msdfColor.r, min(msdfColor.g, msdfColor.b)) -\n                    max(msdfColor.r, max(msdfColor.g, msdfColor.b));\n            \n                // SDF\n                median = min(median, msdfColor.a);\n\n                var screenPxDistance = distance * (median - 0.5);\n                var alpha = clamp(screenPxDistance + 0.5, 0.0, 1.0);\n                if (median < 0.01) {\n                    alpha = 0.0;\n                } else if (median > 0.99) {\n                    alpha = 1.0;\n                }\n\n                return alpha;\n            }\n        ",
          },
        },
        Y = {
          name: "msdf-bit",
          fragment: {
            header:
              "\n            float calculateMSDFAlpha(vec4 msdfColor, float distance) {\n                \n                // MSDF\n                float median = msdfColor.r + msdfColor.g + msdfColor.b -\n                                min(msdfColor.r, min(msdfColor.g, msdfColor.b)) -\n                                max(msdfColor.r, max(msdfColor.g, msdfColor.b));\n               \n                // SDF\n                median = min(median, msdfColor.a);\n            \n                float screenPxDistance = distance * (median - 0.5);\n                float alpha = clamp(screenPxDistance + 0.5, 0.0, 1.0);\n           \n                if (median < 0.01) {\n                    alpha = 0.0;\n                } else if (median > 0.99) {\n                    alpha = 1.0;\n                }\n\n                return alpha;\n            }\n        ",
          },
        };
      class K extends L.M {
        constructor() {
          const e = new D.k({
              uColor: {
                value: new Float32Array([1, 1, 1, 1]),
                type: "vec4<f32>",
              },
              uTransformMatrix: { value: new z.u(), type: "mat3x3<f32>" },
              uDistance: { value: 4, type: "f32" },
              uRound: { value: 0, type: "f32" },
            }),
            t = (0, I.v)({
              name: "sdf-shader",
              bits: [H.F, (0, W._)(O.k), X, V, G.b],
            });
          super({
            glProgram: (0, I.I)({
              name: "sdf-shader",
              bits: [H.a, (0, W.P)(O.k), $, Y, G.m],
            }),
            gpuProgram: t,
            resources: { localUniforms: e, batchSamplers: E.v },
          });
        }
      }
      class N {
        constructor(e) {
          (this._gpuBitmapText = {}), (this._renderer = e);
        }
        validateRenderable(e) {
          const t = this._getGpuBitmapText(e);
          return (
            e._didTextUpdate &&
              ((e._didTextUpdate = !1), this._updateContext(e, t)),
            this._renderer.renderPipes.graphics.validateRenderable(t)
          );
        }
        addRenderable(e, t) {
          const r = this._getGpuBitmapText(e);
          j(e, r),
            e._didTextUpdate &&
              ((e._didTextUpdate = !1), this._updateContext(e, r)),
            this._renderer.renderPipes.graphics.addRenderable(r, t),
            r.context.customShader && this._updateDistanceField(e);
        }
        destroyRenderable(e) {
          this._destroyRenderableByUid(e.uid);
        }
        _destroyRenderableByUid(e) {
          k.Z.return(this._gpuBitmapText[e]), (this._gpuBitmapText[e] = null);
        }
        updateRenderable(e) {
          const t = this._getGpuBitmapText(e);
          j(e, t),
            this._renderer.renderPipes.graphics.updateRenderable(t),
            t.context.customShader && this._updateDistanceField(e);
        }
        _updateContext(e, t) {
          const { context: r } = t,
            i = S.getFont(e.text, e._style);
          r.clear(),
            "none" !== i.distanceField.type &&
              (r.customShader ||
                (this._sdfShader || (this._sdfShader = new K()),
                (r.customShader = this._sdfShader)));
          const s = Array.from(e.text),
            n = e._style;
          let a = (n._stroke?.width || 0) / 2;
          a += i.baseLineOffset;
          const o = w(s, n, i);
          let h = 0;
          const l = n.padding,
            d = o.scale;
          r.translate(
            -e._anchor._x * o.width - l,
            -e._anchor._y * (o.height + o.offsetY) - l
          ).scale(d, d);
          const u = n._fill.color;
          for (let e = 0; e < o.lines.length; e++) {
            const t = o.lines[e];
            for (let e = 0; e < t.charPositions.length; e++) {
              const n = s[h++],
                o = i.chars[n];
              o?.texture &&
                r.texture(
                  o.texture,
                  u || "black",
                  Math.round(t.charPositions[e] + o.xOffset),
                  Math.round(a + o.yOffset)
                );
            }
            a += i.lineHeight;
          }
        }
        _getGpuBitmapText(e) {
          return this._gpuBitmapText[e.uid] || this.initGpuText(e);
        }
        initGpuText(e) {
          const t = k.Z.get(U.A);
          return (
            (this._gpuBitmapText[e.uid] = t),
            this._updateContext(e, t),
            e.on("destroyed", () => {
              this.destroyRenderable(e);
            }),
            this._gpuBitmapText[e.uid]
          );
        }
        _updateDistanceField(e) {
          const t = this._getGpuBitmapText(e).context,
            r = e._style.fontFamily,
            i = p.l.get(`${r}-bitmap`),
            { a: s, b: n, c: a, d: o } = e.groupTransform,
            h = Math.sqrt(s * s + n * n),
            l = Math.sqrt(a * a + o * o),
            d = (Math.abs(h) + Math.abs(l)) / 2,
            u = i.baseRenderedFontSize / e._style.fontSize,
            c = e.resolution ?? this._renderer.resolution,
            g = d * i.distanceField.range * (1 / u) * c;
          t.customShader.resources.localUniforms.uniforms.uDistance = g;
        }
        destroy() {
          for (const e in this._gpuBitmapText) this._destroyRenderableByUid(e);
          (this._gpuBitmapText = null),
            this._sdfShader?.destroy(!0),
            (this._sdfShader = null),
            (this._renderer = null);
        }
      }
      function j(e, t) {
        (t.groupTransform = e.groupTransform),
          (t.groupColorAlpha = e.groupColorAlpha),
          (t.groupColor = e.groupColor),
          (t.groupBlendMode = e.groupBlendMode),
          (t.globalDisplayStatus = e.globalDisplayStatus),
          (t.groupTransform = e.groupTransform),
          (t.localDisplayStatus = e.localDisplayStatus),
          (t.groupAlpha = e.groupAlpha),
          (t._roundPixels = e._roundPixels);
      }
      (N.extension = {
        type: [i.Ag.WebGLPipes, i.Ag.WebGPUPipes, i.Ag.CanvasPipes],
        name: "bitmapText",
      }),
        i.XO.add(N, R, B);
    },
    7559: (e, t, r) => {
      var i = r(8507),
        s = r(4492),
        n = r(2048),
        a = r(8218),
        o = r(8422);
      class h {
        constructor(e) {
          (this._gpuText = Object.create(null)), (this._renderer = e);
        }
        validateRenderable(e) {
          const t = this._getGpuText(e),
            r = e._getKey();
          return t.textureNeedsUploading
            ? ((t.textureNeedsUploading = !1), !0)
            : t.currentKey !== r;
        }
        addRenderable(e) {
          const t = this._getGpuText(e).batchableSprite;
          e._didTextUpdate && this._updateText(e),
            this._renderer.renderPipes.batch.addToBatch(t);
        }
        updateRenderable(e) {
          const t = this._getGpuText(e).batchableSprite;
          e._didTextUpdate && this._updateText(e), t.batcher.updateElement(t);
        }
        destroyRenderable(e) {
          this._destroyRenderableById(e.uid);
        }
        _destroyRenderableById(e) {
          const t = this._gpuText[e];
          this._renderer.htmlText.decreaseReferenceCount(t.currentKey),
            a.Z.return(t.batchableSprite),
            (this._gpuText[e] = null);
        }
        _updateText(e) {
          const t = e._getKey(),
            r = this._getGpuText(e),
            i = r.batchableSprite;
          r.currentKey !== t &&
            this._updateGpuText(e).catch((e) => {
              console.error(e);
            }),
            (e._didTextUpdate = !1);
          const s = e._style.padding;
          (0, n.y)(i.bounds, e._anchor, i.texture, s);
        }
        async _updateGpuText(e) {
          e._didTextUpdate = !1;
          const t = this._getGpuText(e);
          if (t.generatingTexture) return;
          const r = e._getKey();
          this._renderer.htmlText.decreaseReferenceCount(t.currentKey),
            (t.generatingTexture = !0),
            (t.currentKey = r);
          const i = e.resolution ?? this._renderer.resolution,
            s = await this._renderer.htmlText.getManagedTexture(
              e.text,
              i,
              e._style,
              e._getKey()
            ),
            a = t.batchableSprite;
          (a.texture = t.texture = s),
            (t.generatingTexture = !1),
            (t.textureNeedsUploading = !0),
            e.onViewUpdate();
          const o = e._style.padding;
          (0, n.y)(a.bounds, e._anchor, a.texture, o);
        }
        _getGpuText(e) {
          return this._gpuText[e.uid] || this.initGpuText(e);
        }
        initGpuText(e) {
          const t = {
              texture: s.g.EMPTY,
              currentKey: "--",
              batchableSprite: a.Z.get(o.K),
              textureNeedsUploading: !1,
              generatingTexture: !1,
            },
            r = t.batchableSprite;
          return (
            (r.renderable = e),
            (r.texture = s.g.EMPTY),
            (r.bounds = { minX: 0, maxX: 1, minY: 0, maxY: 0 }),
            (r.roundPixels = this._renderer._roundPixels | e._roundPixels),
            (this._gpuText[e.uid] = t),
            e.on("destroyed", () => {
              this.destroyRenderable(e);
            }),
            t
          );
        }
        destroy() {
          for (const e in this._gpuText) this._destroyRenderableById(e);
          (this._gpuText = null), (this._renderer = null);
        }
      }
      h.extension = {
        type: [i.Ag.WebGLPipes, i.Ag.WebGPUPipes, i.Ag.CanvasPipes],
        name: "htmlText",
      };
      var l = r(2437),
        d = r(5099),
        u = r(1761);
      var c = r(268),
        p = r(2558);
      const g = "http://www.w3.org/2000/svg",
        f = "http://www.w3.org/1999/xhtml";
      class m {
        constructor() {
          (this.svgRoot = document.createElementNS(g, "svg")),
            (this.foreignObject = document.createElementNS(g, "foreignObject")),
            (this.domElement = document.createElementNS(f, "div")),
            (this.styleElement = document.createElementNS(f, "style")),
            (this.image = new Image());
          const {
            foreignObject: e,
            svgRoot: t,
            styleElement: r,
            domElement: i,
          } = this;
          e.setAttribute("width", "10000"),
            e.setAttribute("height", "10000"),
            (e.style.overflow = "hidden"),
            t.appendChild(e),
            e.appendChild(r),
            e.appendChild(i);
        }
      }
      var x = r(8291),
        _ = r(8011),
        b = r(2577);
      function y(e) {
        const t = e._stroke,
          r = e._fill,
          i = [
            `div { ${[
              `color: ${b.Q.shared.setValue(r.color).toHex()}`,
              `font-size: ${e.fontSize}px`,
              `font-family: ${e.fontFamily}`,
              `font-weight: ${e.fontWeight}`,
              `font-style: ${e.fontStyle}`,
              `font-variant: ${e.fontVariant}`,
              `letter-spacing: ${e.letterSpacing}px`,
              `text-align: ${e.align}`,
              `padding: ${e.padding}px`,
              `white-space: ${
                "pre" === e.whiteSpace && e.wordWrap ? "pre-wrap" : e.whiteSpace
              }`,
              ...(e.lineHeight ? [`line-height: ${e.lineHeight}px`] : []),
              ...(e.wordWrap
                ? [
                    "word-wrap: " + (e.breakWords ? "break-all" : "break-word"),
                    `max-width: ${e.wordWrapWidth}px`,
                  ]
                : []),
              ...(t ? [v(t)] : []),
              ...(e.dropShadow ? [T(e.dropShadow)] : []),
              ...e.cssOverrides,
            ].join(";")} }`,
          ];
        return (
          (function (e, t) {
            for (const r in e) {
              const i = e[r],
                s = [];
              for (const e in i)
                S[e]
                  ? s.push(S[e](i[e]))
                  : w[e] && s.push(w[e].replace("{{VALUE}}", i[e]));
              t.push(`${r} { ${s.join(";")} }`);
            }
          })(e.tagStyles, i),
          i.join(" ")
        );
      }
      function T(e) {
        const t = b.Q.shared.setValue(e.color).setAlpha(e.alpha).toHexa(),
          r = `${Math.round(Math.cos(e.angle) * e.distance)}px ${Math.round(
            Math.sin(e.angle) * e.distance
          )}px`;
        return e.blur > 0
          ? `text-shadow: ${r} ${e.blur}px ${t}`
          : `text-shadow: ${r} ${t}`;
      }
      function v(e) {
        return [
          `-webkit-text-stroke-width: ${e.width}px`,
          `-webkit-text-stroke-color: ${b.Q.shared.setValue(e.color).toHex()}`,
          `text-stroke-width: ${e.width}px`,
          `text-stroke-color: ${b.Q.shared.setValue(e.color).toHex()}`,
          "paint-order: stroke",
        ].join(";");
      }
      const w = {
          fontSize: "font-size: {{VALUE}}px",
          fontFamily: "font-family: {{VALUE}}",
          fontWeight: "font-weight: {{VALUE}}",
          fontStyle: "font-style: {{VALUE}}",
          fontVariant: "font-variant: {{VALUE}}",
          letterSpacing: "letter-spacing: {{VALUE}}px",
          align: "text-align: {{VALUE}}",
          padding: "padding: {{VALUE}}px",
          whiteSpace: "white-space: {{VALUE}}",
          lineHeight: "line-height: {{VALUE}}px",
          wordWrapWidth: "max-width: {{VALUE}}px",
        },
        S = {
          fill: (e) => `color: ${b.Q.shared.setValue(e).toHex()}`,
          breakWords: (e) => "word-wrap: " + (e ? "break-all" : "break-word"),
          stroke: v,
          dropShadow: T,
        };
      class C extends x.x {
        constructor(e = {}) {
          super(e),
            (this._cssOverrides = []),
            this.cssOverrides ?? (this.cssOverrides = e.cssOverrides),
            (this.tagStyles = e.tagStyles ?? {});
        }
        set cssOverrides(e) {
          (this._cssOverrides = e instanceof Array ? e : [e]), this.update();
        }
        get cssOverrides() {
          return this._cssOverrides;
        }
        _generateKey() {
          return (
            (this._styleKey = (0, _.V)(this) + this._cssOverrides.join("-")),
            this._styleKey
          );
        }
        update() {
          (this._cssStyle = null), super.update();
        }
        clone() {
          return new C({
            align: this.align,
            breakWords: this.breakWords,
            dropShadow: this.dropShadow,
            fill: this._fill,
            fontFamily: this.fontFamily,
            fontSize: this.fontSize,
            fontStyle: this.fontStyle,
            fontVariant: this.fontVariant,
            fontWeight: this.fontWeight,
            letterSpacing: this.letterSpacing,
            lineHeight: this.lineHeight,
            padding: this.padding,
            stroke: this._stroke,
            whiteSpace: this.whiteSpace,
            wordWrap: this.wordWrap,
            wordWrapWidth: this.wordWrapWidth,
            cssOverrides: this.cssOverrides,
          });
        }
        get cssStyle() {
          return this._cssStyle || (this._cssStyle = y(this)), this._cssStyle;
        }
        addOverride(...e) {
          const t = e.filter((e) => !this.cssOverrides.includes(e));
          t.length > 0 && (this.cssOverrides.push(...t), this.update());
        }
        removeOverride(...e) {
          const t = e.filter((e) => this.cssOverrides.includes(e));
          t.length > 0 &&
            ((this.cssOverrides = this.cssOverrides.filter(
              (e) => !t.includes(e)
            )),
            this.update());
        }
        set fill(e) {
          "string" != typeof e &&
            "number" != typeof e &&
            (0, c.R)(
              "[HTMLTextStyle] only color fill is not supported by HTMLText"
            ),
            (super.fill = e);
        }
        set stroke(e) {
          e &&
            "string" != typeof e &&
            "number" != typeof e &&
            (0, c.R)(
              "[HTMLTextStyle] only color stroke is not supported by HTMLText"
            ),
            (super.stroke = e);
        }
      }
      var A = r(1979);
      async function P(e, t) {
        const r = await (async function (e) {
          const t = await u.e.get().fetch(e),
            r = await t.blob(),
            i = new FileReader();
          return await new Promise((e, t) => {
            (i.onloadend = () => e(i.result)),
              (i.onerror = t),
              i.readAsDataURL(r);
          });
        })(t);
        return `@font-face {\n        font-family: "${e.fontFamily}";\n        src: url('${r}');\n        font-weight: ${e.fontWeight};\n        font-style: ${e.fontStyle};\n    }`;
      }
      const M = new Map();
      var F = r(7608);
      var B = r(4016);
      let R;
      class k {
        constructor(e) {
          (this._activeTextures = {}),
            (this._renderer = e),
            (this._createCanvas = e.type === d.W.WEBGPU);
        }
        getTexture(e) {
          return this._buildTexturePromise(e.text, e.resolution, e.style);
        }
        getManagedTexture(e, t, r, i) {
          if (this._activeTextures[i])
            return (
              this._increaseReferenceCount(i), this._activeTextures[i].promise
            );
          const s = this._buildTexturePromise(e, t, r).then(
            (e) => ((this._activeTextures[i].texture = e), e)
          );
          return (
            (this._activeTextures[i] = {
              texture: null,
              promise: s,
              usageCount: 1,
            }),
            s
          );
        }
        async _buildTexturePromise(e, t, r) {
          const i = a.Z.get(m),
            s = (function (e, t) {
              const r = t.fontFamily,
                i = [],
                s = {},
                n = e.match(/font-family:([^;"\s]+)/g);
              function a(e) {
                s[e] || (i.push(e), (s[e] = !0));
              }
              if (Array.isArray(r)) for (let e = 0; e < r.length; e++) a(r[e]);
              else a(r);
              n &&
                n.forEach((e) => {
                  a(e.split(":")[1].trim());
                });
              for (const e in t.tagStyles) a(t.tagStyles[e].fontFamily);
              return i;
            })(e, r),
            n = await (async function (e, t, r) {
              const i = e
                .filter((e) => A.l.has(`${e}-and-url`))
                .map((e, i) => {
                  if (!M.has(e)) {
                    const { url: s } = A.l.get(`${e}-and-url`);
                    0 === i
                      ? M.set(e, P(t, s))
                      : M.set(
                          e,
                          P(
                            {
                              fontWeight: r.fontWeight,
                              fontStyle: r.fontStyle,
                              fontFamily: e,
                            },
                            s
                          )
                        );
                  }
                  return M.get(e);
                });
              return (await Promise.all(i)).join("\n");
            })(s, r, C.defaultTextStyle),
            o = (function (e, t, r, i) {
              i = i || R || (R = new m());
              const { domElement: s, styleElement: n, svgRoot: a } = i;
              (s.innerHTML = `<style>${t.cssStyle}</style><div>${e}</div>`),
                s.setAttribute(
                  "style",
                  "transform-origin: top left; display: inline-block"
                ),
                r && (n.textContent = r),
                document.body.appendChild(a);
              const o = s.getBoundingClientRect();
              a.remove();
              const h = B.P.measureFont(t.fontStyle).descent;
              return { width: o.width, height: o.height + h };
            })(e, r, n, i),
            h = Math.ceil(Math.ceil(Math.max(1, o.width) + 2 * r.padding) * t),
            l = Math.ceil(Math.ceil(Math.max(1, o.height) + 2 * r.padding) * t),
            d = i.image;
          (d.width = 0 | h), (d.height = 0 | l);
          const c = (function (e, t, r, i, s) {
            const { domElement: n, styleElement: a, svgRoot: o } = s;
            (n.innerHTML = `<style>${t.cssStyle}</style><div>${e}</div>`),
              n.setAttribute(
                "style",
                `transform: scale(${r});transform-origin: top left; display: inline-block`
              ),
              (a.textContent = i);
            const { width: h, height: l } = s.image;
            return (
              o.setAttribute("width", h.toString()),
              o.setAttribute("height", l.toString()),
              new XMLSerializer().serializeToString(o)
            );
          })(e, r, t, n, i);
          await (function (e, t, r) {
            return new Promise(async (i) => {
              r && (await new Promise((e) => setTimeout(e, 100))),
                (e.onload = () => {
                  i();
                }),
                (e.src = `data:image/svg+xml;charset=utf8,${encodeURIComponent(
                  t
                )}`),
                (e.crossOrigin = "anonymous");
            });
          })(
            d,
            c,
            (function () {
              const { userAgent: e } = u.e.get().getNavigator();
              return /^((?!chrome|android).)*safari/i.test(e);
            })() && s.length > 0
          );
          let g = d;
          this._createCanvas &&
            (g = (function (e, t) {
              const r = F.N.getOptimalCanvasAndContext(e.width, e.height, t),
                { context: i } = r;
              return (
                i.clearRect(0, 0, e.width, e.height),
                i.drawImage(e, 0, 0),
                F.N.returnCanvasAndContext(r),
                r.canvas
              );
            })(d, t));
          const f = (0, p.M)(g, d.width, d.height, t);
          return (
            this._createCanvas && this._renderer.texture.initSource(f.source),
            a.Z.return(i),
            f
          );
        }
        _increaseReferenceCount(e) {
          this._activeTextures[e].usageCount++;
        }
        decreaseReferenceCount(e) {
          const t = this._activeTextures[e];
          t &&
            (t.usageCount--,
            0 === t.usageCount &&
              (t.texture
                ? this._cleanUp(t)
                : t.promise
                    .then((e) => {
                      (t.texture = e), this._cleanUp(t);
                    })
                    .catch(() => {
                      (0, c.R)("HTMLTextSystem: Failed to clean texture");
                    }),
              (this._activeTextures[e] = null)));
        }
        _cleanUp(e) {
          l.W.returnTexture(e.texture),
            (e.texture.source.resource = null),
            (e.texture.source.uploadMethodId = "unknown");
        }
        getReferenceCount(e) {
          return this._activeTextures[e].usageCount;
        }
        destroy() {
          this._activeTextures = null;
        }
      }
      (k.extension = {
        type: [i.Ag.WebGLSystem, i.Ag.WebGPUSystem, i.Ag.CanvasSystem],
        name: "htmlText",
      }),
        (k.defaultFontOptions = {
          fontFamily: "Arial",
          fontStyle: "normal",
          fontWeight: "normal",
        }),
        i.XO.add(k),
        i.XO.add(h);
    },
    3548: (e, t, r) => {
      r.d(t, { r: () => l });
      var i = r(2577),
        s = r(9313),
        n = r(4492),
        a = r(268),
        o = r(7276),
        h = r(2806);
      function l(e, t) {
        if (e.texture === n.g.WHITE && !e.fill)
          return i.Q.shared.setValue(e.color).toHex();
        if (!e.fill) {
          const r = t.createPattern(e.texture.source.resource, "repeat"),
            i = e.matrix.copyTo(s.u.shared);
          return (
            i.scale(e.texture.frame.width, e.texture.frame.height),
            r.setTransform(i),
            r
          );
        }
        if (e.fill instanceof h.m) {
          const r = e.fill,
            i = t.createPattern(r.texture.source.resource, "repeat"),
            n = r.transform.copyTo(s.u.shared);
          return (
            n.scale(r.texture.frame.width, r.texture.frame.height),
            i.setTransform(n),
            i
          );
        }
        if (e.fill instanceof o._) {
          const r = e.fill;
          if ("linear" === r.type) {
            const e = t.createLinearGradient(r.x0, r.y0, r.x1, r.y1);
            return (
              r.gradientStops.forEach((t) => {
                e.addColorStop(t.offset, i.Q.shared.setValue(t.color).toHex());
              }),
              e
            );
          }
        }
        return (0, a.R)("FillStyle not recognised", e), "red";
      }
    },
    6958: (e, t, r) => {
      var i = r(8507),
        s = r(2048),
        n = r(8218),
        a = r(8422);
      class o {
        constructor(e) {
          (this._gpuText = Object.create(null)), (this._renderer = e);
        }
        validateRenderable(e) {
          const t = this._getGpuText(e),
            r = e._getKey();
          if (t.currentKey !== r) {
            const r = e.resolution ?? this._renderer.resolution,
              { width: i, height: s } =
                this._renderer.canvasText.getTextureSize(e.text, r, e._style);
            return (
              1 !== this._renderer.canvasText.getReferenceCount(t.currentKey) ||
              i !== t.texture._source.width ||
              s !== t.texture._source.height
            );
          }
          return !1;
        }
        addRenderable(e, t) {
          const r = this._getGpuText(e).batchableSprite;
          e._didTextUpdate && this._updateText(e),
            this._renderer.renderPipes.batch.addToBatch(r);
        }
        updateRenderable(e) {
          const t = this._getGpuText(e).batchableSprite;
          e._didTextUpdate && this._updateText(e), t.batcher.updateElement(t);
        }
        destroyRenderable(e) {
          this._destroyRenderableById(e.uid);
        }
        _destroyRenderableById(e) {
          const t = this._gpuText[e];
          this._renderer.canvasText.decreaseReferenceCount(t.currentKey),
            n.Z.return(t.batchableSprite),
            (this._gpuText[e] = null);
        }
        _updateText(e) {
          const t = e._getKey(),
            r = this._getGpuText(e),
            i = r.batchableSprite;
          r.currentKey !== t && this._updateGpuText(e), (e._didTextUpdate = !1);
          const n = e._style.padding;
          (0, s.y)(i.bounds, e._anchor, i.texture, n);
        }
        _updateGpuText(e) {
          const t = this._getGpuText(e),
            r = t.batchableSprite;
          t.texture &&
            this._renderer.canvasText.decreaseReferenceCount(t.currentKey);
          const i = e.resolution ?? this._renderer.resolution;
          (t.texture = r.texture =
            this._renderer.canvasText.getTexture(
              e.text,
              i,
              e._style,
              e._getKey()
            )),
            (t.currentKey = e._getKey()),
            (r.texture = t.texture);
        }
        _getGpuText(e) {
          return this._gpuText[e.uid] || this.initGpuText(e);
        }
        initGpuText(e) {
          const t = {
            texture: null,
            currentKey: "--",
            batchableSprite: n.Z.get(a.K),
          };
          return (
            (t.batchableSprite.renderable = e),
            (t.batchableSprite.bounds = { minX: 0, maxX: 1, minY: 0, maxY: 0 }),
            (t.batchableSprite.roundPixels =
              this._renderer._roundPixels | e._roundPixels),
            (this._gpuText[e.uid] = t),
            this._updateText(e),
            e.on("destroyed", () => {
              this.destroyRenderable(e);
            }),
            t
          );
        }
        destroy() {
          for (const e in this._gpuText) this._destroyRenderableById(e);
          (this._gpuText = null), (this._renderer = null);
        }
      }
      o.extension = {
        type: [i.Ag.WebGLPipes, i.Ag.WebGPUPipes, i.Ag.CanvasPipes],
        name: "text",
      };
      var h = r(2577),
        l = r(9939),
        d = r(7608),
        u = r(2437),
        c = r(9252);
      function p(e, t, r) {
        for (let i = 0, s = 4 * r * t; i < t; ++i, s += 4)
          if (0 !== e[s + 3]) return !1;
        return !0;
      }
      function g(e, t, r, i, s) {
        const n = 4 * t;
        for (let t = i, a = i * n + 4 * r; t <= s; ++t, a += n)
          if (0 !== e[a + 3]) return !1;
        return !0;
      }
      var f = r(2558),
        m = r(4016),
        x = r(1242),
        _ = r(3548);
      class b {
        constructor() {
          this._activeTextures = {};
        }
        getTextureSize(e, t, r) {
          const i = m.P.measureText(e || " ", r);
          let s = Math.ceil(
              Math.ceil(Math.max(1, i.width) + 2 * r.padding) * t
            ),
            n = Math.ceil(Math.ceil(Math.max(1, i.height) + 2 * r.padding) * t);
          return (
            (s = Math.ceil(s - 1e-6)),
            (n = Math.ceil(n - 1e-6)),
            (s = (0, l.U5)(s)),
            (n = (0, l.U5)(n)),
            { width: s, height: n }
          );
        }
        getTexture(e, t, r, i) {
          if (this._activeTextures[i])
            return (
              this._increaseReferenceCount(i), this._activeTextures[i].texture
            );
          const s = m.P.measureText(e || " ", r),
            n = Math.ceil(Math.ceil(Math.max(1, s.width) + 2 * r.padding) * t),
            a = Math.ceil(Math.ceil(Math.max(1, s.height) + 2 * r.padding) * t),
            o = d.N.getOptimalCanvasAndContext(n, a),
            { canvas: h } = o;
          this.renderTextToCanvas(e, r, t, o);
          const l = (0, f.M)(h, n, a, t);
          if (r.trim) {
            const e = (function (e, t = 1) {
              const { width: r, height: i } = e,
                s = e.getContext("2d", { willReadFrequently: !0 });
              if (null === s)
                throw new TypeError("Failed to get canvas 2D context");
              const n = s.getImageData(0, 0, r, i).data;
              let a = 0,
                o = 0,
                h = r - 1,
                l = i - 1;
              for (; o < i && p(n, r, o); ) ++o;
              if (o === i) return c.M.EMPTY;
              for (; p(n, r, l); ) --l;
              for (; g(n, r, a, o, l); ) ++a;
              for (; g(n, r, h, o, l); ) --h;
              return ++h, ++l, new c.M(a / t, o / t, (h - a) / t, (l - o) / t);
            })(h, t);
            l.frame.copyFrom(e), l.updateUvs();
          }
          return (
            (this._activeTextures[i] = {
              canvasAndContext: o,
              texture: l,
              usageCount: 1,
            }),
            l
          );
        }
        _increaseReferenceCount(e) {
          this._activeTextures[e].usageCount++;
        }
        decreaseReferenceCount(e) {
          const t = this._activeTextures[e];
          if ((t.usageCount--, 0 === t.usageCount)) {
            d.N.returnCanvasAndContext(t.canvasAndContext),
              u.W.returnTexture(t.texture);
            const r = t.texture.source;
            (r.resource = null),
              (r.uploadMethodId = "unknown"),
              (r.alphaMode = "no-premultiply-alpha"),
              (this._activeTextures[e] = null);
          }
        }
        getReferenceCount(e) {
          return this._activeTextures[e].usageCount;
        }
        renderTextToCanvas(e, t, r, i) {
          const { canvas: s, context: n } = i,
            a = (0, x.Z)(t),
            o = m.P.measureText(e || " ", t),
            l = o.lines,
            d = o.lineHeight,
            u = o.lineWidths,
            c = o.maxLineWidth,
            p = o.fontProperties,
            g = s.height;
          if (
            (n.resetTransform(),
            n.scale(r, r),
            n.clearRect(0, 0, o.width + 4, o.height + 4),
            t._stroke?.width)
          ) {
            const e = t._stroke;
            (n.lineWidth = e.width),
              (n.miterLimit = e.miterLimit),
              (n.lineJoin = e.join),
              (n.lineCap = e.cap);
          }
          let f, b;
          n.font = a;
          const y = t.dropShadow ? 2 : 1;
          for (let e = 0; e < y; ++e) {
            const s = t.dropShadow && 0 === e,
              a = s ? Math.ceil(Math.max(1, g) + 2 * t.padding) : 0,
              o = a * r;
            if (s) {
              (n.fillStyle = "black"), (n.strokeStyle = "black");
              const e = t.dropShadow,
                i = e.color,
                s = e.alpha;
              n.shadowColor = h.Q.shared.setValue(i).setAlpha(s).toRgbaString();
              const a = e.blur * r,
                l = e.distance * r;
              (n.shadowBlur = a),
                (n.shadowOffsetX = Math.cos(e.angle) * l),
                (n.shadowOffsetY = Math.sin(e.angle) * l + o);
            } else
              (n.globalAlpha = t._fill?.alpha ?? 1),
                (n.fillStyle = t._fill ? (0, _.r)(t._fill, n) : null),
                t._stroke?.width && (n.strokeStyle = (0, _.r)(t._stroke, n)),
                (n.shadowColor = "black");
            let m = (d - p.fontSize) / 2;
            d - p.fontSize < 0 && (m = 0);
            const x = t._stroke?.width ?? 0;
            for (let e = 0; e < l.length; e++)
              (f = x / 2),
                (b = x / 2 + e * d + p.ascent + m),
                "right" === t.align
                  ? (f += c - u[e])
                  : "center" === t.align && (f += (c - u[e]) / 2),
                t._stroke &&
                  this._drawLetterSpacing(
                    l[e],
                    t,
                    i,
                    f + t.padding,
                    b + t.padding - a,
                    !0
                  ),
                void 0 !== t._fill &&
                  this._drawLetterSpacing(
                    l[e],
                    t,
                    i,
                    f + t.padding,
                    b + t.padding - a
                  );
          }
        }
        _drawLetterSpacing(e, t, r, i, s, n = !1) {
          const { context: a } = r,
            o = t.letterSpacing;
          let h = !1;
          if (
            (m.P.experimentalLetterSpacingSupported &&
              (m.P.experimentalLetterSpacing
                ? ((a.letterSpacing = `${o}px`),
                  (a.textLetterSpacing = `${o}px`),
                  (h = !0))
                : ((a.letterSpacing = "0px"), (a.textLetterSpacing = "0px"))),
            0 === o || h)
          )
            return void (n ? a.strokeText(e, i, s) : a.fillText(e, i, s));
          let l = i;
          const d = m.P.graphemeSegmenter(e);
          let u = a.measureText(e).width,
            c = 0;
          for (let e = 0; e < d.length; ++e) {
            const t = d[e];
            n ? a.strokeText(t, l, s) : a.fillText(t, l, s);
            let r = "";
            for (let t = e + 1; t < d.length; ++t) r += d[t];
            (c = a.measureText(r).width), (l += u - c + o), (u = c);
          }
        }
        destroy() {
          this._activeTextures = null;
        }
      }
      (b.extension = {
        type: [i.Ag.WebGLSystem, i.Ag.WebGPUSystem, i.Ag.CanvasSystem],
        name: "canvasText",
      }),
        i.XO.add(b),
        i.XO.add(o);
    },
    2558: (e, t, r) => {
      r.d(t, { M: () => n });
      var i = r(2437);
      const s = new (r(9636).c)();
      function n(e, t, r, n) {
        const a = s;
        (a.minX = 0),
          (a.minY = 0),
          (a.maxX = (e.width / n) | 0),
          (a.maxY = (e.height / n) | 0);
        const o = i.W.getOptimalTexture(a.width, a.height, n, !1);
        return (
          (o.source.uploadMethodId = "image"),
          (o.source.resource = e),
          (o.source.alphaMode = "premultiply-alpha-on-upload"),
          (o.frame.width = t / n),
          (o.frame.height = r / n),
          o.source.emit("update", o.source),
          o.updateUvs(),
          o
        );
      }
    },
  },
]);
