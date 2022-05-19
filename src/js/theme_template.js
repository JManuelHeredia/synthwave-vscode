(function () {

  // Grab body node
  const bodyNode = document.querySelector('body');

  // Replace the styles with the glow theme
  const initNeonDreams = (disableGlow, obs) => {
    var themeStyleTag = document.querySelector('.vscode-tokens-styles');

    if (!themeStyleTag) {
      return;
    }

    var initialThemeStyles = themeStyleTag.innerText;
    
    var updatedThemeStyles = initialThemeStyles;
    
    if (!disableGlow) {
      /* replace neon red */
      updatedThemeStyles = updatedThemeStyles.replace(/color: #fe4450;/g, "color: #FF6666; text-shadow: 0 0 4px #fc1f2c[NEON_BRIGHTNESS], 0 0 14px #fc1f2c[NEON_BRIGHTNESS]; font-weight: 600;");
      /* replace neon pink */
      updatedThemeStyles = updatedThemeStyles.replace(/color: #ff7edb;/g, "color: #f5cfdd; text-shadow: 0 0 1px #ff073ecc, 0 0 3px #fff3;");
      /* replace yellow */
      updatedThemeStyles = updatedThemeStyles.replace(/color: #fede5d;/g, "color: #eeeeee; text-shadow: 0 0 2px #eaeaea, 0 0 6px #f39f05[NEON_BRIGHTNESS];");
      /* replace green */
      updatedThemeStyles = updatedThemeStyles.replace(/color: #72f1b8;/g, "color: #ccff66; text-shadow: 0 0 3px #100c0f, 0 0 10px #25ff99[NEON_BRIGHTNESS]");
      /* replace blue */
      updatedThemeStyles = updatedThemeStyles.replace(/color: #36f9f6;/g, "color: #acffff; text-shadow: 0 0 6px #0399f9[NEON_BRIGHTNESS], 0 0 12px #66ffff[NEON_BRIGHTNESS]; font-weight: 600;");
      /* replace black */
      updatedThemeStyles = updatedThemeStyles.replace(/color: #969798;/g, "color: #99ffdd; text-shadow: 0 0 4px #25FF99[NEON_BRIGHTNESS], 0 0 2px #ffffff[NEON_BRIGHTNESS];");
      /* replace purple */
      updatedThemeStyles = updatedThemeStyles.replace(/color: #959697;/g, "color: #dedede; text-shadow: 0 0 2px #44ff05[NEON_BRIGHTNESS], 0 0 8px #66ff99[NEON_BRIGHTNESS]; font-weight: bold;");
      /* replace HTML TAG */
      updatedThemeStyles = updatedThemeStyles.replace(/color: #987654;/g, "color: #99CCFF; font-weight: 500; text-shadow: 0 0 6px #0399f9[NEON_BRIGHTNESS], 0 0 12px #66ffff[NEON_BRIGHTNESS]; font-weight: 600;");
    }

    /* append the remaining styles */
    updatedThemeStyles = `${updatedThemeStyles}[CHROME_STYLES]`;

    const newStyleTag = document.createElement('style');
    newStyleTag.setAttribute("id", "synthwave-84-theme-styles");
    newStyleTag.innerText = updatedThemeStyles.replace(/(\r\n|\n|\r)/gm, '');
    document.body.appendChild(newStyleTag);
    
    console.log('SyntDark initialised!');
    
    // disconnect the observer because we don't need it anymore
    if (obs) {
      obs.disconnect();
      obs = null;
    }
  };

  // Callback function to execute when mutations are observed
  const watchForBootstrap = function(mutationsList, observer) {
      for(let mutation of mutationsList) {
          if (mutation.type === 'attributes') {
            // only init if we're using a Synthwave 84 subtheme
            const isUsingSynthwave = document.querySelector('[class*="Stratorrider-synthwave-vscode-themes"]');
            // does the style div exist yet?
            const tokensLoaded = document.querySelector('.vscode-tokens-styles')
            // does it have content ?
            const tokenStyles = document.querySelector('.vscode-tokens-styles').innerText
                            && document.querySelector('.vscode-tokens-styles').innerText !== '';

            // sometimes VS code takes a while to init the styles content, so stop this observer and add an observer for that
            if (isUsingSynthwave && tokensLoaded) {
              if (!tokenStyles) {
                // sometimes VS code takes a while to init the styles content, so if there stop this observer and add an observer for that
                observer.disconnect();
                observer.observe(tokensLoaded, { childList: true });
              } else {
                // If everything we need is ready, then initialise
                initNeonDreams([DISABLE_GLOW], observer);
              }
            }
          }
          if (mutation.type === 'childList') {
            const isUsingSynthwave = document.querySelector('[class*="Stratorrider-synthwave-vscode-themes"]');
            const tokensLoaded = document.querySelector('.vscode-tokens-styles');
            const tokenStyles  = document.querySelector('.vscode-tokens-styles').innerText
                              && document.querySelector('.vscode-tokens-styles').innerText !== '';

            // Everything we need is ready, so initialise
            if (isUsingSynthwave && tokensLoaded && tokenStyles) {
                initNeonDreams([DISABLE_GLOW], observer);
            }
          }
      }
  };

  // try to initialise the theme
  initNeonDreams([DISABLE_GLOW]);

  // Use a mutation observer to check when we can bootstrap the theme
  const observer = new MutationObserver(watchForBootstrap);
  observer.observe(bodyNode, { attributes: true });

})();