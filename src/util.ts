/**
 * This function coerces a string into a string literal type.
 * Using tagged union types in TypeScript 2.0, this enables
 * powerful typechecking of our reducers.
 *
 * Since every action label passes through this function it
 * is a good place to ensure all of our action labels
 * are unique.
 */

const typeCache: { [label: string]: boolean } = {};
export function type<T>(label: T | ''): T {
  if (typeCache[<string>label]) {
    throw new Error(`Action type "${label}" is not unique"`);
  }

  typeCache[<string>label] = true;

  return <T>label;
}

export const mapStyles = [{
  featureType: 'landscape',
  stylers: [{hue: '#FFBB00'}, {saturation: 43.400000000000006}, {lightness: 37.599999999999994}, {gamma: 1}]
}, {
  featureType: 'road.highway',
  stylers: [{hue: '#FFC200'}, {saturation: -61.8}, {lightness: 45.599999999999994}, {gamma: 1}]
}, {
  featureType: 'road.arterial',
  stylers: [{hue: '#FF0300'}, {saturation: -100}, {lightness: 51.19999999999999}, {gamma: 1}]
}, {featureType: 'road.local', stylers: [{hue: '#FF0300'}, {saturation: -100}, {lightness: 52}, {gamma: 1}]}, {
  featureType: 'water',
  stylers: [{hue: '#0078FF'}, {saturation: -13.200000000000003}, {lightness: 2.4000000000000057}, {gamma: 1}]
}, {featureType: 'poi', stylers: [{hue: '#00FF6A'}, {saturation: -1.0989010989011234}, {lightness: 11.200000000000017}, {gamma: 1}]}];

export const markerClustererOptions = {
  styles: [
    {
      width: 36,
      height: 36,
      url: '/assets/dot_2.png',
      textColor: '#fff'
    },
    {
      width: 43,
      height: 36,
      url: '/assets/dot_3.png',
      textColor: '#fff'
    },
    {
      width: 50,
      height: 36,
      url: '/assets/dot_4.png',
      textColor: '#fff'
    }
  ]
};
