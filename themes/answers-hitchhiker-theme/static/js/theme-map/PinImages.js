/**
 * PinImages is meant to offer an accessible way to change the pin images for result pin
 * on the interactive map page. Given some config, an SVG should be customizable to
 * have branding consistent styling in this file.
 */
class PinImages {
  /**
   * @param {Object} defaultPinConfig The configuration for the default pin
   * @param {Object} hoveredPinConfig The configuration for the hovered pin
   * @param {Object} selectedPinConfig The configuration for the selected pin
   */
  constructor(defaultPinConfig = {}, hoveredPinConfig = {}, selectedPinConfig = {}) {
    this.defaultPinConfig = defaultPinConfig;
    this.hoveredPinConfig = hoveredPinConfig;
    this.selectedPinConfig = selectedPinConfig;
  }

  /**
   * Generate standard theme pin given some parameters
   * @param {string} pin.backgroundColor Background color for the pin
   * @param {string} pin.strokeColor Stroke (border) color for the pin
   * @param {string} pin.labelColor Label (text) color for the pin
   * @param {number} pin.width The width of the pin
   * @param {number} pin.height The height of the pin
   * @param {string} pin.pinCount The index of the pin for the pin text
   * @return {Object} The SVG of the pin, and its width and height
   */
  generatePin ({
    backgroundColor = '#5387d7',
    strokeColor = 'black',
    labelColor = 'white',
    width = 26,
    height= 32,
    index = '',
    profile = ''
  } = {}) {
    const svg = `
 <svg xmlns="http://www.w3.org/2000/svg"
         width="${width}"
         height="${height}"
         viewBox="0 -1 22 28">
      <g fill="none" fill-rule="evenodd">
        <path fill="${backgroundColor}"
              fill-rule="nonzero"
              stroke="${strokeColor}"
              d="M0 10.767c0 5.563 7.196 12.418 9.947 14.836.6.527 1.509.53 2.112.005C14.815 23.212 22 16.423 22 10.767 22 4.82 17.075 0 11 0S0 4.82 0 10.767"/>
        <text fill="${labelColor}"
              font-family="Arial-BoldMT,Arial"
              font-size="12"
              font-weight="bold">
          <tspan x="50%" y="15" text-anchor="middle">${index}</tspan>
        </text>
      </g>
    </svg>`;
    return { svg, width, height };
  };

  /**
   * Get the default pin image
   * @param {Number} pinCount The pin index number for the pin label
   * @param {Object} profile The profile data for the entity associated with the pin
   */
  getDefaultPin (index, profile) {
    return this.generatePin({
      backgroundColor: this.defaultPinConfig.backgroundColor,
      strokeColor: this.defaultPinConfig.strokeColor,
      labelColor: this.defaultPinConfig.labelColor,
      width: 28,
      height: 32,
      index: index,
      profile: profile
    });
  }

  /**
   * Get the hovered pin image
   * @param {Number} pinCount The pin index number for the pin label
   * @param {Object} profile The profile data for the entity associated with the pin
   */
  getHoveredPin (index, profile) {
    return this.generatePin({
      backgroundColor: this.hoveredPinConfig.backgroundColor,
      strokeColor: this.hoveredPinConfig.strokeColor,
      labelColor: this.hoveredPinConfig.labelColor,
      width: 24,
      height: 34,
      index: index,
      profile: profile
    });
  }

  /**
   * Get the selected pin image
   * @param {Number} pinCount The pin index number for the pin label
   * @param {Object} profile The profile data for the entity associated with the pin
   */
  getSelectedPin (index, profile) {
    return this.generatePin({
      backgroundColor: this.selectedPinConfig.backgroundColor,
      strokeColor: this.selectedPinConfig.strokeColor,
      labelColor: this.selectedPinConfig.labelColor,
      width: 24,
      height: 34,
      index: index,
      profile: profile
    });
  }
}

export { PinImages };
