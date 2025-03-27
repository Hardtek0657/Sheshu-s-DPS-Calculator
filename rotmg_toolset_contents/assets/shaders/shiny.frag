varying vec2 vTextureCoord;
uniform sampler2D uTexture;
uniform sampler2D uMaskTexture;
uniform float uTime;

void main(void)
{
    vec4 baseColor = texture2D(uTexture, vTextureCoord);
    float red = floor(baseColor.r * 255.0);

    if (baseColor.a < 1.0 || red == 1.0)
    {
        gl_FragColor = baseColor;
    }

    else
    {
        float value = texture2D(uMaskTexture, vTextureCoord).r + uTime;
        
        if (value > 1.0 && value < 1.2)
        {
            gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
        }

        else
        {
            gl_FragColor = baseColor;
        }
    }
}
