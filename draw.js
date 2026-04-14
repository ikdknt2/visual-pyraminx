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
  { pts: [X,D,F], idx: 0 },
  { pts: [G,B,M], idx: 1 },
  { pts: [E,L,A], idx: 2 },
  { pts: [D,P,F], idx: 3 },
  { pts: [G,P,M], idx: 4 },
  { pts: [L,P,E], idx: 5 },
  { pts: [F,P,G], idx: 6 },
  { pts: [M,P,L], idx: 7 },
  { pts: [E,P,D], idx: 8 },

  { pts: [X,F,H], idx: 9 },
  { pts: [I,O,C], idx: 10 },
  { pts: [G,B,N], idx: 11 },
  { pts: [F,Q,H], idx: 12 },
  { pts: [I,Q,O], idx: 13 },
  { pts: [N,Q,G], idx: 14 },
  { pts: [H,Q,I], idx: 15 },
  { pts: [O,Q,N], idx: 16 },
  { pts: [G,Q,F], idx: 17 },

  { pts: [X,H,D], idx: 18 },
  { pts: [E,J,A], idx: 19 },
  { pts: [K,I,C], idx: 20 },
  { pts: [H,R,D], idx: 21 },
  { pts: [R,E,J], idx: 22 },
  { pts: [K,R,I], idx: 23 },
  { pts: [R,D,E], idx: 24 },
  { pts: [K,R,J], idx: 25 },
  { pts: [I,R,H], idx: 26 },
];


// ===== 色 =====
const colorMap = {
  G: "#00cc00",
  R: "#ff0000",
  B: "#0000ff",
  Y: "#ffff00"
};

// 仮 state（3面）
const state = [
  ..."GGGGGGGGG",
  ..."RRRRRRRRR",
  ..."BBBBBBBBB"
];


// ===== 座標変換 =====
function ptsToString(pts){
  return pts.map(p => `${p[0]+150},${150-p[1]}`).join(" ");
}


// ===== 描画 =====
function draw(){
  svg.innerHTML = "";

  triangles.forEach(t => {
    const poly = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "polygon"
    );

    poly.setAttribute("points", ptsToString(t.pts));
    poly.setAttribute("fill", colorMap[state[t.idx]]);
    poly.setAttribute("stroke", "#000");
    poly.setAttribute("stroke-width", "1");

    svg.appendChild(poly);
  });
}

draw();
