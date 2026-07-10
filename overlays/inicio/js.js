const main = document.getElementById("maindiv");

(function placeNebulas()
{
    const nebulas = Array.from(document.querySelectorAll(".nebula"));
    const bg = document.querySelector(".space-bg");
    const W = (bg && bg.clientWidth) || window.innerWidth;
    const H = (bg && bg.clientHeight) || window.innerHeight;

    const cols = 2, rows = 2;
    const cells = [];
    for (let r = 0; r < rows; r++)
        for (let c = 0; c < cols; c++)
            cells.push({ c, r });

    for (let i = cells.length - 1; i > 0; i--)
    {
        const j = Math.floor(Math.random() * (i + 1));
        [cells[i], cells[j]] = [cells[j], cells[i]];
    }

    nebulas.forEach((n, idx) =>
    {
        const cell = cells[idx % cells.length];
        const scale = Math.random() * 0.5 + 0.8;
        const baseW = parseFloat(getComputedStyle(n).width) / scale;
        const baseH = parseFloat(getComputedStyle(n).height) / scale;
        const newW = baseW * scale;
        const newH = baseH * scale;
        n.style.width = newW + "px";
        n.style.height = newH + "px";

        const cx = (cell.c + 0.5) / cols * W + (Math.random() - 0.5) * 0.24 * W;
        const cy = (cell.r + 0.5) / rows * H + (Math.random() - 0.5) * 0.24 * H;

        const left = Math.min(Math.max(cx - newW / 2, -newW * 0.3), W - newW * 0.7);
        const top = Math.min(Math.max(cy - newH / 2, -newH * 0.3), H - newH * 0.7);

        n.style.right = "auto";
        n.style.bottom = "auto";
        n.style.left = left + "px";
        n.style.top = top + "px";

        const delay = "-" + (Math.random() * 34).toFixed(1) + "s";
        n.style.animationDelay = delay + ", " + delay;
    });
})();

(function createStarfield()
{
    const canvas = document.getElementById("starfield");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let w = 0, h = 0, cx = 0, cy = 0;
    let stars = [];

    function resize()
    {
        const dpr = window.devicePixelRatio || 1;
        w = canvas.clientWidth;
        h = canvas.clientHeight;
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        cx = w / 2;
        cy = h / 2;
    }

    function build()
    {
        const count = 110;
        const maxR = Math.hypot(w, h) / 2 + 80;
        stars = [];
        for (let i = 0; i < count; i++)
        {
            const depth = Math.random() * 0.7 + 0.3;
            stars.push({
                r: Math.random() * maxR,
                theta: Math.random() * Math.PI * 2,
                depth: depth,
                rot: (0.00006 + Math.random() * 0.00010) * depth,
                drift: (4 + Math.random() * 10) * depth,
                size: (Math.random() * 1.6 + 0.6) * depth + 0.4,
                phase: Math.random() * Math.PI * 2,
                tw: 0.6 + Math.random() * 0.8
            });
        }
    }

    function frame(t)
    {
        ctx.clearRect(0, 0, w, h);

        const dt = 1 / 60;
        for (const s of stars)
        {
            s.theta += s.rot * 16;
            let y = cy + s.r * Math.sin(s.theta) + (t * 0.001 * s.drift);
            y %= (h + 160);
            if (y < -80) y += h + 160;
            const x = cx + s.r * Math.cos(s.theta);
            s._x = x;
            s._y = y;

            const tw = 0.55 + 0.45 * Math.sin(t * 0.001 * s.tw + s.phase);
            ctx.beginPath();
            ctx.arc(x, y, s.size, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(255,255,255," + tw.toFixed(3) + ")";
            ctx.fill();
        }

        const linkDist = 110;
        for (let i = 0; i < stars.length; i++)
        {
            const a = stars[i];
            for (let j = i + 1; j < stars.length; j++)
            {
                const b = stars[j];
                const dx = a._x - b._x;
                const dy = a._y - b._y;
                const d = Math.hypot(dx, dy);
                if (d < linkDist)
                {
                    const alpha = (1 - d / linkDist) * 0.22;
                    ctx.beginPath();
                    ctx.moveTo(a._x, a._y);
                    ctx.lineTo(b._x, b._y);
                    ctx.strokeStyle = "rgba(200,170,255," + alpha.toFixed(3) + ")";
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(frame);
    }

    window.addEventListener("resize", () => { resize(); build(); });
    resize();
    build();
    requestAnimationFrame(frame);
})();
const duration = {Duration} * 1000;

function removeSelf()
{
    main.style.visibility='hidden';
    sendParentMessage({ Type: "Remove", ID: "{ID}" });
}

performAnimation("{EntranceAnimationFramework}", "{EntranceAnimationName}", main).then((result) =>
{
    {CustomAnimations}

    if (duration > 0.0)
    {
        setTimeout(() =>
        {
            performAnimation("{ExitAnimationFramework}", "{ExitAnimationName}", main).then((result) =>
            {
                removeSelf();
            });
        }, duration);
    }
});