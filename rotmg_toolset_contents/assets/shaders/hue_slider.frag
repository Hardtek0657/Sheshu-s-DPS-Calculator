varying vec2 vTextureCoord;

uniform vec2 uDimensions;
uniform vec3 uBorderColor;

vec3 rgb2hsv(vec3 c)
{
    vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
    vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
    vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));

    float d = q.x - min(q.w, q.y);
    float e = 1.0e-10;
    return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}

vec3 hsv2rgb(vec3 c)
{
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}


void main(void)
{
    vec2 pixel = vTextureCoord * uDimensions.xy;
    vec3 hsv = vec3(vTextureCoord.x, 1.0, 1.0);

    if (pixel.x < 2.0 || pixel.x > uDimensions.x - 2.0 || pixel.y < 2.0 || pixel.y > uDimensions.y - 2.0)
    {
        gl_FragColor = vec4(uBorderColor, 1.0);
    }

    else
    {
        gl_FragColor = vec4(hsv2rgb(hsv), 1.0);
    }
}
