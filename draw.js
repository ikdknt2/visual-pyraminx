const svg = document.getElementById("pyra");

const SQRT3 = Math.sqrt(3);

// ===== points =====
const A = [-50, -50*(SQRT3/3)];
const B = [ 50, -50*(SQRT3/3)];
const C = [  0, 100*(SQRT3/3)];

const X = [0, 0];

const D = [-(50/3), -50*(SQRT3/9)];
const E = [-(100/3), -(100*SQRT3/9)];
const F = [ (50/3), -50*(SQRT3/9)];
const G = [ (100/3), -100*(SQRT3/9)];
const H = [0, 100*(SQRT3/9)];
const I = [0, 200*(SQRT3/9)];

const J = [-(100/3), 0];
const K = [-(50/3), 50*(SQRT3/3)];
const L = [-(50/3), -50*(SQRT3/3)];
const M = [ (50/3), -50*(SQRT3/3)];
const N = [ (100/3), 0];

const O = [ (50/3), 50*(SQRT3/3) ];

const P = [0, -100*(SQRT3/9)];
const Q = [ (50/3), 50*(SQRT3/9)];
const R = [-(50/3), 50*(SQRT3/9)];


// ===== triangles (27個) =====
const triangles = [
  { name: "FRL", pts: [X,D,F], idx: 0 },
  { name: "FRD", pts: [G,B,M], idx: 1 },
  { name: "FLD", pts: [E,L,A], idx: 2 },
  { name: "Fu",  pts: [D,P,F], idx: 3 },
  { name: "Fr",  pts: [G,P,M], idx: 4 },
  { name: "Fl",  pts: [L,P,E], idx: 5 },
  { name: "FR",  pts: [F,P,G], idx: 6 },
  { name: "FD",  pts: [M,P,L], idx: 7 },
  { name: "FL",  pts: [E,P,D], idx: 8 },

  { name: "RFL", pts: [X,F,H], idx: 9 },
  { name: "RDL", pts: [I,O,C], idx: 10 },
  { name: "RDF", pts: [G,B,N], idx: 11 },
  { name: "Ru",  pts: [F,Q,H], idx: 12 },
  { name: "Rl",  pts: [I,Q,O], idx: 13 },
  { name: "Rf",  pts: [N,Q,G], idx: 14 },
  { name: "RL",  pts: [H,Q,I], idx: 15 },
  { name: "RD",  pts: [O,Q,N], idx: 16 },
  { name: "RF",  pts: [G,Q,F], idx: 17 },

  { name: "LFR", pts: [X,H,D], idx: 18 },
  { name: "LDF", pts: [E,J,A], idx: 19 },
  { name: "LDR", pts: [K,I,C], idx: 20 },
  { name: "Lu",  pts: [H,R,D], idx: 21 },
  { name: "Lf",  pts: [R,E,J], idx: 22 },
  { name: "Lr",  pts: [K,R,I], idx: 23 },
  { name: "LF",  pts: [R,D,E], idx: 24 },
  { name: "LD",  pts: [K,R,J], idx: 25 },
  { name: "LR",  pts: [I,R,H], idx: 26 },
];

// ===== 色 =====
const colorMap = {
  G: "#00cc00",
  R: "#ff0000",
  B: "#0000ff",
  Y: "#ffff00",
  X: "#545454"
};

// 仮 state（3面）
const state = [
  ..."GGGGGGGGG",
  ..."RRRRRRRRR",
  ..."BBBBBBBBB"
];


// ===== 座標変換 =====
function ptsToString(pts){
  // 小数座標の描画ゆらぎを抑えるため、座標を軽く丸める
  return pts
    .map(p => `${(p[0]+150).toFixed(2)},${(150-p[1]).toFixed(2)}`)
    .join(" ");
}

// ===== ズレ補正 =====
function shrink(pts, strokeWidth){
  const cx = (pts[0][0]+pts[1][0]+pts[2][0])/3;
  const cy = (pts[0][1]+pts[1][1]+pts[2][1])/3;

  const factor = 1 - strokeWidth * 0.01;

  return pts.map(p => [
    cx + (p[0]-cx)*factor,
    cy + (p[1]-cy)*factor
  ]);
}

// ===== 描画 =====
function draw(){
  svg.innerHTML = "";

  const strokeWidth = 1; // ←ここで調整

  triangles.forEach(t => {
    const poly = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "polygon"
    );

    // 👇 ここで縮小をかける
    const shrunk = shrink(t.pts, strokeWidth);

    poly.setAttribute("points", ptsToString(shrunk));
    poly.setAttribute("fill", colorMap[state[t.idx]]);
    poly.setAttribute("stroke", "#222");
    poly.setAttribute("stroke-width", strokeWidth);
    poly.setAttribute("stroke-linejoin", "round");
    poly.setAttribute("stroke-width", strokeWidth);
    svg.appendChild(poly);
  });
}

draw();
