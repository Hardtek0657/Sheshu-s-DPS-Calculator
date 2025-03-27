in vec2 vTextureCoord;
uniform sampler2D uTexture;
uniform sampler2D uMaskTexture;
uniform vec2 uFrameSize;
uniform vec2 uDimensions;
uniform float uScaleX;

void main(void)
{
    vec2 maskUV = vTextureCoord;
    if (uScaleX < 0.0)
    {
        maskUV.x = uDimensions.x / uFrameSize.x - maskUV.x;
    }

    vec4 maskColor = texture2D(uMaskTexture, maskUV);
    if (maskColor.r > 0.0)
    {
        vec4 baseColor = texture2D(uTexture, maskUV);
        gl_FragColor = vec4(baseColor.rgb * maskColor.r, baseColor.a);
    }

    else
    {
        gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
    }
}