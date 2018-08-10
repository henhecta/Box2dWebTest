var ClientSizeX, ClientSizeY;
var scale;
var WorldSizeX = 10, WorldSizeY = 10;

var isTouch = false;
var MouseX = -1, MouseY = -1;

const DMax = 0.8;

var stats = new Stats();
stats.domElement.style.position = 'absolute';
stats.domElement.style.left = '0px';
stats.domElement.style.top = '0px';

document.body.appendChild(stats.domElement);

var svg;
var ns = 'http://www.w3.org/2000/svg'

var counter;
var counterg = new Object();
var countergColor = new Object();
var counterVal = new Object();
var facts = new Object();
var marginX, marginY;
var BodyNum;

var numbers = [
    [2, 70],
    [3, 70],
    [4, 70],
    [5, 70],
    [6, 70],
    [7, 70],
    [8, 70],
    [9, 70],
    [10, 100],
    [11, 100],
    [12, 100],
    [13, 100],
    [14, 100],
    [15, 100],
    [16, 100],
    [17, 100],
    [18, 100],
    [19, 35],
    [20, 100],
    [21, 100],
    [22, 100],
    [23, 30],
    [24, 100],
    [25, 100],
    [26, 50],
    [27, 100],
    [28, 100],
    [29, 30],
    [30, 100],
    [31, 30],
    [32, 30],
    [33, 30],
    [34, 30],
    [35, 30],
    [36, 30],
    [37, 30],
    [38, 30],
    [39, 30],
    [40, 30],
    [41, 30],
    [42, 30],
    [43, 30],
    [44, 30],
    [45, 30],
    [46, 30],
    [48, 30],
    [49, 30],
    [50, 30],
    [111, 3],
    [221, 3],
    [323, 3],
    [361, 3],
    [527, 3],
    [529, 3],
    [533, 3],
    [551, 3],
    [559, 3],
    [697, 3],
    [703, 3],
    [713, 3],
    [731, 3],
    [775, 3],
    [779, 3],
    [817, 3],
    [841, 3],
    [851, 3],
    [899, 3],
    [943, 3],
    [961, 3],
    [1073, 3],
    [1147, 3],
    [1189, 3],
    [1271, 3],
    [1369, 3],
    [1517, 3],
    [1591, 3],
    [1681, 3],
    [1763, 3],
    [1849, 3],
    [4921, 3],
    [6851, 3],
    [7429, 3],
    [9367, 3],
    [9503, 3],
    [28561, 3],
    [46139, 3],
    [65231, 3],
    [79507, 3],
    [111111, 4],
    [130321, 2],
    [161051, 2],
    [371293, 2],
    [707281, 2],
    [282475249, 3],
    [6541380665835015, 3]
    //MX[9007199254740991, 3]
];

var NumberImageD = [
    ['c', 36, 0, 42, 47, 41, 75, 0, 28, -5, 75, -41, 75, 's', -41, -46, -41, -75, 's', 5, -75, 41, -75, 'zm', 0, 21, 'c', -12, 0, -17, 18, -17, 54, 0, 35, 5, 53, 17, 53, 's', 18, -17, 18, -53, -6, -54, -18, -54, 'z'],
    ['v', 150, 'h', -24, 'v', -127, 'h', -13, 'l', 1, -23, 'z'],
    ['h', 55, 'v', 23, 'h', -84, 'v', -23, 'l', 52, -70, 'c', 13, -17, 3, -37, -9, -38, -12, 0, -18, 8, -25, 19, 'l', -16, -11, 'c', 8, -16, 23, -27, 40, -27, 16, 0, 23, 3, 31, 14, 9, 12, 12, 34, 1, 50, 'z'],
    ['c', 18, 7, 24, 19, 24, 36, -2, 29, -17, 43, -43, 43, -20, 0, -29, -8, -40, -25, 'l', 15, -13, 's', 13, 18, 25, 18, 'c', 14, -1, 19, -12, 19, -24, -2, -24, -17, -23, -38, -24, 'v', -19, 'c', 21, -1, 38, -3, 38, -25, 0, -10, -8, -19, -17, -19, -14, 1, -18, 7, -24, 17, 'l', -16, -12, 'c', 5, -15, 22, -25, 38, -25, 26, 1, 39, 16, 40, 39, -1, 18, -7, 26, -21, 33, 'z'],
    ['h', -50, 'v', -17, 'l', 32, -100, 19, 6, -28, 90, 'h', 27, 'v', -58, 'h', 21, 'v', 58, 'h', 21, 'v', 21, 'h', -21, 'l', 1, 30, 'h', -22, 'z'],
    ['h', 69, 'l', -1, 22, 'h', -46, 'v', 33, 'c', 4, -3, 12, -5, 20, -5, 'c', 27, 0, 37, 22, 37, 48, 'c', 0, 25, -15, 50, -44, 50, 'c', -14, 0, -31, -11, -37, -17, 'l', 12, -13, 's', 13, 10, 25, 10, 'c', 13, -1, 21, -18, 21, -31, 's', -4, -27, -17, -27, 'c', -12, -1, -19, 3, -25, 17, 'l', -14, -10, 'v', -77, 'z'],
    ['c', 28, 0, 35, 24, 35, 47, 0, 26, -13, 49, -39, 49, -34, 0, -43, -35, -43, -61, 2, -42, 24, -82, 61, -92, 'l', 6, 17, 'c', -38, 17, -53, 74, -40, 105, 15, 25, 33, 2, 34, -19, 0, -26, -20, -33, -31, -11, 'l', -12, -13, 'c', 7, -10, 16, -22, 29, -22, 'z'],
    ['h', 71, 'l', 11, 12, -30, 134, 'h', -23, 'l', 29, -124, 'h', -37, 'v', 28, 'h', -19, 'z'],
    ['c', -35, -22, -17, -70, 17, -71, 30, 0, 37, 18, 49, 37, 'l', -13, 13, -2, -2, -21, 21, 'c', 20, 12, 30, 27, 30, 44, -2, 27, -18, 40, -43, 41, -26, -2, -41, -16, -41, -40, 0, -15, 8, -30, 24, -43, 'zm', 37, -38, 'c', -4, -8, -11, -13, -19, -13, -10, 0, -17, 8, -17, 16, 0, 7, 4, 14, 13, 21, 8, -8, 16, -15, 23, -24, 'zm', -21, 51, 'c', -12, 10, -18, 20, -18, 29, 0, 13, 6, 20, 19, 20, 14, -1, 21, -9, 21, -21, -3, -15, -12, -22, -22, -28, 'z'],
    ['c', -4, 6, -11, 10, -19, 10, -25, -4, -32, -26, -32, -46, 1, -29, 17, -54, 45, -55, 10, 0, 17, 3, 23, 10, 'l', 1, -6, 20, 5, -28, 143, 'h', -21, 'zm', 12, -59, 'c', -3, -4, -6, -11, -19, -11, -12, 0, -23, 13, -23, 34, 0, 10, 4, 24, 14, 24, 8, 0, 17, -4, 21, -14, 'z'],
];
var NumberImage = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
var NumberImageMX = [50, 62, 37, 67, 54, 12, 56, 9, 32, 58];
var NumberImageMY = [25, 25, 152, 96, 145, 27, 79, 27, 94, 114];

var Color = [
    "#f14114",
    "#345abc",
    "#fedc0a",
    "#72be28",
    "#57aaee",
    "#fa9400",
];

var zeroPadding = function (number, digit) {
    var numberLength = String(number).length;
    if (digit > numberLength) {
        return (new Array((digit - numberLength) + 1).join(0)) + number;
    } else {
        return number;
    }
};
var Effect = new Array();
function init() {
    function struct(func) {
        return function () {
            if (!(this instanceof arguments.callee)) {
                var f = new arguments.callee();
                func.apply(f, arguments);
                return f;
            }
            return func.apply(this, arguments);
        };
    }

    function gcd(m, n) { return (n == 0) ? Math.abs(m) : gcd(n, m % n); }

    var BODY = struct(function BODY(b2body, grap, width, height, value, color, rect) {
        this.b2body = b2body;
        this.grap = grap;
        this.width = width;
        this.height = height;
        this.value = value;
        this.color = color;
        this.rect = rect;
    });

    var TOUCH = struct(function TOUCH(v, gcd) {
        this.v = v;
        this.gcd = gcd;
    });


    var b2Vec2 = Box2D.Common.Math.b2Vec2
        , b2AABB = Box2D.Collision.b2AABB
        , b2BodyDef = Box2D.Dynamics.b2BodyDef
        , b2Body = Box2D.Dynamics.b2Body
        , b2FixtureDef = Box2D.Dynamics.b2FixtureDef
        , b2Fixture = Box2D.Dynamics.b2Fixture
        , b2World = Box2D.Dynamics.b2World
        , b2MassData = Box2D.Collision.Shapes.b2MassData
        , b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape
        , b2CircleShape = Box2D.Collision.Shapes.b2CircleShape
        , b2DebugDraw = Box2D.Dynamics.b2DebugDraw
        , b2MouseJointDef = Box2D.Dynamics.Joints.b2MouseJointDef
        ;

    for (var i = 0; i < 10; i++) {
        for (var n of NumberImageD[i]) {
            if ((typeof n) == 'number') NumberImage[i] += ' ' + (n * scale / 200.0);
            else NumberImage[i] += n;
        }
    }

    var world = new b2World(
        new b2Vec2(0, 10)    //gravity
        , true               //allow sleep
    );

    var fixtureDef = new b2FixtureDef;
    fixtureDef.density = 1.0;
    fixtureDef.friction = 0.3;
    fixtureDef.restitution = 0.4;


    var bodyDef = new b2BodyDef;

    var Bodies = new Array();
    for (var i = 0; i < BodyNum; i++)
        Bodies.push(BODY(0, 0, 0, 0, 0, 0, 0));

    var Touch = TOUCH([], 0);

    bodyDef.type = b2Body.b2_staticBody;
    fixtureDef.shape = new b2PolygonShape;

    fixtureDef.shape.SetAsBox(WorldSizeX / 2, 0.5);
    bodyDef.position.Set(WorldSizeX / 2, WorldSizeY + 0.5);
    world.CreateBody(bodyDef).CreateFixture(fixtureDef);

    fixtureDef.shape.SetAsBox(0.5, 100 / 2);
    bodyDef.position.Set(-0.5, -50 + WorldSizeY);
    world.CreateBody(bodyDef).CreateFixture(fixtureDef);
    bodyDef.position.Set(WorldSizeX + 0.5, -50 + WorldSizeY);
    world.CreateBody(bodyDef).CreateFixture(fixtureDef);

    bodyDef.type = b2Body.b2_dynamicBody;

    for (var i = 0; i < BodyNum; i++) {
        MakeFirstBody(i);
    }

    LoadCookie();

    window.setInterval(update, 1000 / 60);


    function SaveCookie() {
        for (var key in facts) {
            document.cookie = key + '=' + facts[key];
        }
        var expire = new Date();
        expire.setTime(expire.getTime() + 1000 * 3600 * 24 * 365 * 3);
        document.cookie = 'expires=' + expire.toUTCString();
    }
    function LoadCookie() {
        var result = [];
        var cookies = document.cookie;

        if (cookies != '') {
            var cookieArray = cookies.split(';');
            for (var i = 0; i < cookieArray.length; i++) {
                var cookie = cookieArray[i].split('=');
                result[Number(cookie[0])] = cookie[1];
            }
        }

        for (var key in facts) {
            if (result[key])
                facts[key] = Number(result[key]);
        }
    }
    function GetRandNumber() {
        var sum = 0;
        for (var i = 0; i < numbers.length; i++) sum += numbers[i][1];

        var r = Math.floor(Math.random() * sum);

        sum = 0;
        for (var i = 0; i < numbers.length; i++) {
            sum += numbers[i][1];
            if (sum > r)
                return numbers[i][0];
        }
        return 1;
    }
    function SetupBody(bodyindex, value, color) {
        var boxShape = new b2PolygonShape;
        Bodies[bodyindex].width = 0.5 * String(value).length;
        Bodies[bodyindex].height = 1;
        fixtureDef.shape.SetAsBox(Bodies[bodyindex].width / 2, Bodies[bodyindex].height / 2);
        Bodies[bodyindex].b2body.CreateFixture(fixtureDef);

        Bodies[bodyindex].rect = document.createElementNS(ns, 'rect')
        Bodies[bodyindex].rect.setAttributeNS(null, 'width', Bodies[bodyindex].width * scale)
        Bodies[bodyindex].rect.setAttributeNS(null, 'height', Bodies[bodyindex].height * scale)
        Bodies[bodyindex].rect.setAttributeNS(null, 'fill', color)
        Bodies[bodyindex].rect.setAttributeNS(null, 'x', -Bodies[bodyindex].width * scale / 2)
        Bodies[bodyindex].rect.setAttributeNS(null, 'y', -Bodies[bodyindex].height * scale / 2)
        Bodies[bodyindex].grap.appendChild(Bodies[bodyindex].rect)

        Bodies[bodyindex].value = value;

        for (var i = 0; i < String(value).length; i++) {
            var num = Math.floor(value / Math.pow(10, String(value).length - i - 1)) % 10;
            var img = document.createElementNS(ns, 'path');
            img.setAttributeNS(null, 'd', 'M' + (NumberImageMX[num] * scale / 200.0 + scale / 2 * i - Bodies[bodyindex].width * scale / 2) + ' ' + (NumberImageMY[num] * scale / 200.0 - 0.5 * scale) + NumberImage[num]);
            img.setAttributeNS(null, 'height', 1.0 * scale);
            img.setAttributeNS(null, 'width', 0.5 * scale);
            Bodies[bodyindex].grap.appendChild(img);
        }
        Bodies[bodyindex].color = color;
    }

    function MakeFirstBody(bodyindex) {
        bodyDef.position.Set(Math.random() * WorldSizeX, -Math.random() * 100);
        bodyDef.angle = Math.random() * Math.PI * 2;
        Bodies[bodyindex].b2body = world.CreateBody(bodyDef);
        Bodies[bodyindex].grap = document.createElementNS(ns, 'g');
        svg.appendChild(Bodies[bodyindex].grap);
        SetupBody(bodyindex, GetRandNumber(), Color[Math.floor(Math.random() * Color.length)]);
    }

    function MakeBody(bodyindex) {
        bodyDef.position.Set(Math.random() * WorldSizeX, -(Math.random() + 1) * WorldSizeY * 0.5);
        bodyDef.angle = Math.random() * Math.PI * 2;
        Bodies[bodyindex].b2body = world.CreateBody(bodyDef);
        SetupBody(bodyindex, GetRandNumber(), Color[Math.floor(Math.random() * Color.length)]);
    }

    function GetTopPos(i, topS) {
        var pos = Bodies[i].b2body.GetPosition();
        var rot = Bodies[i].b2body.GetAngle();

        var top = [
            [-Bodies[i].width / 2, -Bodies[i].height / 2],
            [+Bodies[i].width / 2, -Bodies[i].height / 2],
            [+Bodies[i].width / 2, +Bodies[i].height / 2],
            [-Bodies[i].width / 2, +Bodies[i].height / 2]];

        top[0] = [top[0][0] * Math.cos(rot) - top[0][1] * Math.sin(rot), top[0][1] * Math.cos(rot) + top[0][0] * Math.sin(rot)];
        top[1] = [top[1][0] * Math.cos(rot) - top[1][1] * Math.sin(rot), top[1][1] * Math.cos(rot) + top[1][0] * Math.sin(rot)];
        top[2] = [top[2][0] * Math.cos(rot) - top[2][1] * Math.sin(rot), top[2][1] * Math.cos(rot) + top[2][0] * Math.sin(rot)];
        top[3] = [top[3][0] * Math.cos(rot) - top[3][1] * Math.sin(rot), top[3][1] * Math.cos(rot) + top[3][0] * Math.sin(rot)];

        topS[0] = [(top[0][0] + pos.x) * scale, (top[0][1] + pos.y) * scale];
        topS[1] = [(top[1][0] + pos.x) * scale, (top[1][1] + pos.y) * scale];
        topS[2] = [(top[2][0] + pos.x) * scale, (top[2][1] + pos.y) * scale];
        topS[3] = [(top[3][0] + pos.x) * scale, (top[3][1] + pos.y) * scale];
    }

    function TriangleAndPoint_(a, b, P) {
        return (a[1] - b[1]) * P[0] - (a[0] - b[0]) * P[1] + a[0] * b[1] - b[0] * a[1];
    }
    function TriangleAndPoint(a, b, c, p) {
        var k1, k2, k3;
        k1 = TriangleAndPoint_(a, b, p);
        k2 = TriangleAndPoint_(b, c, p);
        k3 = TriangleAndPoint_(c, a, p);

        return (k1 == 0 && k2 == 0 && k3 == 0) || (k1 > 0 && k2 > 0 && k3 > 0) || (k1 < 0 && k2 < 0 && k3 < 0);
    }
    function BoxAndPoint(a, b, c, d, p) {
        return TriangleAndPoint(a, b, c, p) || TriangleAndPoint(a, c, d, p);
    }
    function GetBodyNum(TouchPos) {
        for (var i = 0; i < Bodies.length; i++) {
            var topS = [];
            GetTopPos(i, topS);

            if (BoxAndPoint(topS[0], topS[1], topS[2], topS[3], TouchPos))
                return i;
        }
        return -1;
    }
    function min_d2(x0, y0, x1, y1, x2, y2) {
        var a = x2 - x1;
        var b = y2 - y1;
        var a2 = a * a;
        var b2 = b * b;
        var r2 = a2 + b2;
        var tt = -(a * (x1 - x0) + b * (y1 - y0));
        if (tt < 0) {
            return (x1 - x0) * (x1 - x0) + (y1 - y0) * (y1 - y0);
        }
        if (tt > r2) {
            return (x2 - x0) * (x2 - x0) + (y2 - y0) * (y2 - y0);
        }
        var f1 = a * (y1 - y0) - b * (x1 - x0);
        return (f1 * f1) / r2;
    }
    function distance(a, b, p) {
        return Math.sqrt(min_d2(p[0], p[1], a[0], a[1], b[0], b[1]));
    }
    function CheckNerar(a, b) {
        var ta = [], tb = [];
        GetTopPos(a, ta);
        GetTopPos(b, tb);

        for (var i = 0; i < 4; i++) for (var j = 0; j < 4; j++) {
            if (distance(ta[i], ta[(i + 1) % 4], tb[j]) <= DMax * scale) return true;
            if (distance(tb[i], tb[(i + 1) % 4], ta[j]) <= DMax * scale) return true;
        }
        return false;
    }

    function NewBody(b) {
        Bodies[b].b2body.DestroyFixture(Bodies[b].b2body.GetFixtureList());
        world.DestroyBody(Bodies[b].b2body);

        while (Bodies[b].grap.firstChild) {
            Bodies[b].grap.removeChild(Bodies[b].grap.firstChild);
        }
        MakeBody(b);
    }
    function UpdateBodyValue(b, v) {
        Bodies[b].b2body.DestroyFixture(Bodies[b].b2body.GetFixtureList());
        //world.DestroyBody(Bodies[b].b2body);

        while (Bodies[b].grap.firstChild) {
            Bodies[b].grap.removeChild(Bodies[b].grap.firstChild);
        }
        SetupBody(b, v, Bodies[b].color);
    }

    function SetEffect(x, y, gcd) {
        var eff = document.createElementNS(ns, 'text');
        eff.setAttributeNS(null, 'x', x)
        eff.setAttributeNS(null, 'y', y)
        eff.setAttributeNS(null, 'font-size', '' + 0.8 * scale)
        eff.setAttributeNS(null, 'font-family', "'Concert One',Helvetica Neue, Helvetica, ヒラギノ角ゴ Pro W3, Yu Gothic, sans-serif")
        eff.setAttributeNS(null, 'dominant-baseline', 'middle')
        eff.setAttributeNS(null, 'opacity', 1)
        eff.setAttributeNS(null, 'font-weight', '400')
        eff.setAttributeNS(null, 'stroke', '#fff')
        eff.setAttributeNS(null, 'stroke-width', 0.04 * scale)
        svg.appendChild(eff);

        var str = '';
        for (var s = gcd, p = 2; s > 1;) {
            if (s % p == 0) {
                s /= p;
                str += " ÷" + p;
            }
            else
                p++;
        }

        var txt = document.createTextNode(str);
        eff.appendChild(txt);

        Effect.push(eff);
    }
    function MoveEffect() {
        for (var eff of Effect) {
            var opa = Number(eff.getAttribute('opacity')) - 0.02;
            eff.setAttributeNS(null, 'opacity', opa);
            eff.setAttributeNS(null, 'y', Number(eff.getAttribute('y')) - 0.02 * scale);
        }
        while (Effect.length > 0 && Number(Effect[0].getAttribute('opacity')) < 0) {
            Effect[0].parentNode.removeChild(Effect[0]);
            Effect.shift();
        }
    }

    function EraseTouch() {
        if (Touch.v.length >= 2) {
            for (var i = 0; i < Touch.v.length; i++) {
                // 一つのブロックを２人が同時に指定したときとか。
                //if (Bodies[Touch.v[i]].value % Touch.gcd != 0) continue;
                var newVal = Bodies[Touch.v[i]].value / Touch.gcd;

                //SetEffects(ToScreen(Body[n].body -> GetPosition().x), ToScreen(Body[n].body -> GetPosition().y), Touch[i].gcd);
                SetEffect(Bodies[Touch.v[i]].b2body.GetPosition().x * scale, Bodies[Touch.v[i]].b2body.GetPosition().y * scale, Touch.gcd);
                for (var s = Touch.gcd, p = 2; s > 1;) {
                    if (s % p == 0) {
                        s /= p;
                        facts[p]++;
                        counterVal[p].nodeValue = '' + zeroPadding(facts[p], 3);
                        SaveCookie();
                    }
                    else
                        p++;
                }

                if (newVal == 1)
                    NewBody(Touch.v[i]);
                else
                    UpdateBodyValue(Touch.v[i], newVal);
            }
        }
        Touch.v = [];
        Touch.gcd = 0;
        //remove(Touch, i);
    }
    function InputOpe() {
        if (MouseX != -1) {
            isTouch = true;

            var b = GetBodyNum([MouseX, MouseY]);

            if (b == -1) return;

            if (Touch.v.length == 0) {
                Touch.v.push(b);
                Touch.gcd = Bodies[b].value;
            }
            else if (Touch.v[Touch.v.length - 1] != b) {
                if (gcd(Touch.gcd, Bodies[b].value) == 1)
                    return;

                if (!CheckNerar(Touch.v[Touch.v.length - 1], b))
                    return;

                if (Touch.v.indexOf(b) >= 0)
                    return;

                Touch.gcd = gcd(Touch.gcd, Bodies[b].value);

                Touch.v.push(b);
            }
        }
        else {
            if (isTouch)
                EraseTouch();
            isTouch = false;
        }
    }

    //update
    //var pathGrap = draw.nested();
    var pathGraph1 = document.createElementNS(ns, 'path');
    var pathGraph2 = document.createElementNS(ns, 'path');
    svg.appendChild(pathGraph1);
    svg.appendChild(pathGraph2);

    var TouchLe = 0;
    function darken(hexstr, scalefactor) {
        if (scalefactor < 0) scalefactor = 0;
        if (scalefactor > 1) scalefactor = 1;
        var r = scalefactor;
        var a, i;
        if (typeof (hexstr) != 'string') {
            return hexstr;
        }
        hexstr = hexstr.replace(/[^0-9a-f]+/ig, '');
        if (hexstr.length == 3) {
            a = hexstr.split('');
        } else if (hexstr.length == 6) {
            a = hexstr.match(/(\w{2})/g);
        } else {
            return hexstr;
        }
        for (i = 0; i < a.length; i++) {
            if (a[i].length == 2)
                a[i] = parseInt(a[i], 16);
            else {
                a[i] = parseInt(a[i], 16);
                a[i] = a[i] * 16 + a[i];
            }
        }

        var maxColor = parseInt('ff', 16);

        function _darken(a) {
            return a * r;
        }

        for (i = 0; i < a.length; i++) {
            a[i] = _darken(a[i]);
            a[i] = Math.floor(a[i]).toString(16);
            if (a[i].length == 1) {
                a[i] = '0' + a[i];
            }
        }
        return a.join('');
    }
    function update() {
        //stage.suspend();
        InputOpe();
        world.Step(1 / 60, 5, 5);
        for (var i = 0; i < BodyNum; i++) {
            var rot = Bodies[i].b2body.GetAngle();
            Bodies[i].grap.setAttributeNS(null, 'transform', "matrix(" + Math.cos(rot) + " " + Math.sin(rot) + " " + -Math.sin(rot) + " " + Math.cos(rot) + " " + (Bodies[i].b2body.GetPosition().x * scale + marginX) + " " + (Bodies[i].b2body.GetPosition().y * scale + marginY) + ")");
        }

        if (MouseX != -1) TouchLe++; else TouchLe = 0;

        if (TouchLe > 20) {
            for (var key in facts) {
                if (Touch.gcd % key == 0) {
                    counterg[key].setAttributeNS(null, 'fill', countergColor[key]);
                    counterVal[key].parentNode.setAttributeNS(null, 'fill', '#' + darken(countergColor[key].slice(1), (TouchLe - 20) * 0.1));
                }
                else {
                    counterg[key].setAttributeNS(null, 'fill', '#' + darken(countergColor[key].slice(1), 1 - (TouchLe - 20) * 0.1));
                    counterVal[key].parentNode.setAttributeNS(null, 'fill', '#000');
                }
            }
        }
        else {
            for (var key in facts) {
                counterg[key].setAttributeNS(null, 'fill', countergColor[key]);
                counterVal[key].parentNode.setAttributeNS(null, 'fill', '#000');
            }
        }

        var path = '';
        for (var i = 0; i < Touch.v.length; i++) {
            if (i == 0) {
                path = 'M' + (Bodies[Touch.v[i]].b2body.GetPosition().x * scale + marginX) + ' ' + (Bodies[Touch.v[i]].b2body.GetPosition().y * scale + marginY);
            } else {
                path += 'L' + (Bodies[Touch.v[i]].b2body.GetPosition().x * scale + marginX) + ' ' + (Bodies[Touch.v[i]].b2body.GetPosition().y * scale + marginY);
            }
        }
        svg.removeChild(pathGraph1);
        pathGraph1 = document.createElementNS(ns, 'path');
        pathGraph1.setAttributeNS(null, 'd', path);
        pathGraph1.setAttributeNS(null, 'fill', 'none');
        pathGraph1.setAttributeNS(null, 'stroke', '#fff');
        pathGraph1.setAttributeNS(null, 'stroke-width', 0.1 * scale);
        pathGraph1.setAttributeNS(null, 'stroke-linecap', 'round');
        pathGraph1.setAttributeNS(null, 'stroke-linejoin', 'round');
        svg.appendChild(pathGraph1);

        svg.removeChild(pathGraph2);
        pathGraph2 = document.createElementNS(ns, 'path');
        pathGraph2.setAttributeNS(null, 'd', path);
        pathGraph2.setAttributeNS(null, 'fill', 'none');
        pathGraph2.setAttributeNS(null, 'stroke', '#ff5a78');
        pathGraph2.setAttributeNS(null, 'stroke-width', 0.1 * scale);
        pathGraph2.setAttributeNS(null, 'stroke-linecap', 'round');
        pathGraph2.setAttributeNS(null, 'stroke-linejoin', 'round');
        pathGraph2.setAttributeNS(null, 'stroke-dasharray', '0 ' + 0.15 * scale);
        pathGraph2.setAttributeNS(null, 'stroke-dashoffset', 0.05 * scale);
        pathGraph1.setAttributeNS(null, 'marker-start', 'url(#Marke)');
        pathGraph1.setAttributeNS(null, 'marker-mid', 'url(#Marke)');
        pathGraph1.setAttributeNS(null, 'marker-end', 'url(#Marke)');
        svg.appendChild(pathGraph2);
        MoveEffect();
        //world.ClearForces();
        stats.update();
    };
};

(function () {
    document.getElementById('container').style.background = '#FFF';

    window.requestAnimationFrame = window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            setTimeout(callback, DEFAULT_FRAME_INTERVAL);
        };

    document.getElementById('container').addEventListener('touchstart', function (e) {
        e.preventDefault();
        MouseX = e.changedTouches[0].pageX - marginX;
        MouseY = e.changedTouches[0].pageY - marginY;
        return false;
    }, { passive: false });

    document.getElementById('container').addEventListener('mousedown', function (e) {
        e.preventDefault();
        MouseX = e.clientX - marginX;
        MouseY = e.clientY - marginY;
        return false;
    }, { passive: false });

    document.getElementById('container').addEventListener('touchmove', function (e) {
        e.preventDefault();
        if (MouseX != -1) {
            MouseX = e.changedTouches[0].pageX - marginX;
            MouseY = e.changedTouches[0].pageY - marginY;
        }
        return false;
    }, { passive: false });

    document.getElementById('container').addEventListener('mousemove', function (e) {
        e.preventDefault();
        if (MouseX != -1) {
            MouseX = e.clientX - marginX;
            MouseY = e.clientY - marginY;
        }
        return false;
    }, { passive: false });

    document.getElementById('container').addEventListener('touchend', function (e) {
        e.preventDefault();
        MouseX = -1;
        MouseY = -1;
    }, { passive: false });

    document.getElementById('container').addEventListener('mouseup', function (e) {
        e.preventDefault();
        MouseX = -1;
        MouseY = -1;
    }, { passive: false });


    for (var n of numbers) {
        for (var s = n[0], p = 2; s > 1;) {
            if (s % p == 0) {
                s /= p;
                facts[p] = 0;
            }
            else p++;
        }
    }

    ClientSizeX = document.getElementById('container').clientWidth;
    ClientSizeY = document.getElementById('container').clientHeight;

    var countergHeight;
    var CounterPos = 0;
    if (ClientSizeX >= ClientSizeY) {
        countergHeight = ClientSizeY * 1.0 / Object.keys(facts).length;
        marginX = 0;
        marginY = 0;
        ClientSizeX -= countergHeight * 2.5;
        CounterPos = 1;
    }
    else {
        countergHeight = (ClientSizeX / (Object.keys(facts).length / 2)) / 2.5;
        marginX = 0;
        marginY = 0;
        ClientSizeY -= countergHeight * 2.0;
        CounterPos = 2;
    }

    var WorldMul;
    if (screen.width > 1000 || screen.height > 1000) WorldMul = 100;
    else WorldMul = Math.floor(Math.pow(screen.width, 0.5) * 2);
    WorldSizeX = Math.sqrt(WorldMul * ClientSizeX / ClientSizeY);
    WorldSizeY = WorldMul / WorldSizeX;
    scale = ClientSizeX / WorldSizeX;

    BodyNum = WorldMul;

    var div = document.getElementById('container');

    svg = document.createElementNS(ns, 'svg');
    svg.setAttributeNS(null, 'width', '100%');
    svg.setAttributeNS(null, 'height', '100%');
    div.appendChild(svg)

    var defs = document.createElementNS(ns, 'defs');
    svg.appendChild(defs);
    var marker = document.createElementNS(ns, 'marker');
    marker.setAttributeNS(null, 'id', 'Marke');
    marker.setAttributeNS(null, 'refX', '1');
    marker.setAttributeNS(null, 'refY', '1');
    marker.setAttributeNS(null, 'markerWidth', '2');
    marker.setAttributeNS(null, 'markerHeight', '2');
    defs.appendChild(marker);
    //var mark = document.createElementNS(ns, 'path');
    //mark.setAttributeNS(null, 'd', 'M1 0.2L1.8 1L1 1.8L0.2 1z');
    //mark.setAttributeNS(null, 'fill', '#f49e42');
    //marker.appendChild(mark);
    //var mark = document.createElementNS(ns, 'path');
    //mark.setAttributeNS(null, 'd', 'M1 0.6L1.4 1L1 1.4L0.6 1z');
    //mark.setAttributeNS(null, 'fill', '#42bcf4');
    //marker.appendChild(mark);
    var mark = document.createElementNS(ns, 'circle');
    mark.setAttributeNS(null, 'cx', '1');
    mark.setAttributeNS(null, 'cy', '1');
    mark.setAttributeNS(null, 'r', '1');
    mark.setAttributeNS(null, 'fill', '#b2ff2d');
    marker.appendChild(mark);

    if (CounterPos == 1) {
        var NumberImage2 = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
        for (var i = 0; i < 10; i++) {
            for (var n of NumberImageD[i]) {
                if ((typeof n) == 'number') NumberImage2[i] += ' ' + (n / 200.0 * countergHeight * 0.8);
                else NumberImage2[i] += n;
            }
        }
        var posy = 0;
        for (var key in facts) {
            if (!facts.hasOwnProperty(key)) continue;
            counterg[key] = document.createElementNS(ns, 'g');
            counterg[key].setAttributeNS(null, 'width', '100%');
            counterg[key].setAttributeNS(null, 'height', '' + (100.0 / Object.keys(facts).length) + '%');
            counterg[key].setAttributeNS(null, 'transform', 'translate(' + ClientSizeX + ',' + posy + ')');
            svg.appendChild(counterg[key]);
            posy += countergHeight;
        }
    }
    else {
        var NumberImage2 = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
        for (var i = 0; i < 10; i++) {
            for (var n of NumberImageD[i]) {
                if ((typeof n) == 'number') NumberImage2[i] += ' ' + (n / 200.0 * countergHeight * 0.8);
                else NumberImage2[i] += n;
            }
        }
        var posx = 0;
        var posy = ClientSizeY;
        for (var key in facts) {
            if (!facts.hasOwnProperty(key)) continue;
            counterg[key] = document.createElementNS(ns, 'g');
            counterg[key].setAttributeNS(null, 'width', '' + countergHeight * 2.5);
            counterg[key].setAttributeNS(null, 'height', '' + (100.0 / Object.keys(facts).length) + '%');
            counterg[key].setAttributeNS(null, 'transform', 'translate(' + posx + ',' + posy + ')');
            svg.appendChild(counterg[key]);
            posx += countergHeight * 2.5;
            if (posx + countergHeight * 2.5 > ClientSizeX) {
                posx = 0;
                posy += countergHeight;
            }
        }
    }

    for (var key in facts) {
        if (!facts.hasOwnProperty(key)) continue;
        var imgbox = document.createElementNS(ns, 'rect')
        //imgbox.setAttributeNS(null, 'width', countergHeight * 0.5 * String(key).length * 0.8)
        //imgbox.setAttributeNS(null, 'height', countergHeight * 0.8)
        //imgbox.setAttributeNS(null, 'x', countergHeight * 0.1)
        //imgbox.setAttributeNS(null, 'y', countergHeight * 0.1)

        countergColor[key] = Color[Math.floor(Math.random() * Color.length)];

        counterg[key].setAttributeNS(null, 'fill', countergColor[key]);
        imgbox.setAttributeNS(null, 'width', countergHeight * 2.5 * 0.9)
        imgbox.setAttributeNS(null, 'height', countergHeight * 0.1)
        imgbox.setAttributeNS(null, 'x', countergHeight * 2.5 * 0.05)
        imgbox.setAttributeNS(null, 'y', countergHeight * 0.8)
        counterg[key].appendChild(imgbox)

        for (var i = 0; i < String(key).length; i++) {
            var num = Math.floor(key / Math.pow(10, String(key).length - i - 1)) % 10;
            var img = document.createElementNS(ns, 'path');
            img.setAttributeNS(null, 'd', 'M' + (NumberImageMX[num] * countergHeight * 0.8 / 200.0 + countergHeight * 0.8 / 2 * i + countergHeight * 0.1) + ' ' + (NumberImageMY[num] * countergHeight * 0.8 / 200.0 + countergHeight * 0.1) + NumberImage2[num]);
            counterg[key].appendChild(img);
        }

        var text = document.createElementNS(ns, 'text')
        text.setAttributeNS(null, 'height', countergHeight)
        text.setAttributeNS(null, 'x', countergHeight)
        text.setAttributeNS(null, 'y', countergHeight * 0.63)
        text.setAttributeNS(null, 'font-size', '' + countergHeight * 0.7)
        text.setAttributeNS(null, 'font-family', "'Concert One',Helvetica Neue, Helvetica, ヒラギノ角ゴ Pro W3, Yu Gothic, sans-serif")
        text.setAttributeNS(null, 'dominant-baseline', 'middle')
        text.setAttributeNS(null, 'font-weight', '400')
        text.setAttributeNS(null, 'fill', '#000')
        counterg[key].appendChild(text);

        counterVal[key] = document.createTextNode('' + zeroPadding(0, 3));
        text.appendChild(counterVal[key]);
    }
    init();
})();