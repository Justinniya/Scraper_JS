function getSystemAmenities(systemAmenities, inputAmenities) {
  const added = [];
  const removed = [];

  // Check keys that exist in both objects for value changes
  for (let key in systemAmenities) {
    if (inputAmenities.hasOwnProperty(key)) {
      if (systemAmenities[key] === false && inputAmenities[key] === true) {
        added.push(key);
      } else if (systemAmenities[key] === true && inputAmenities[key] === false) {
        removed.push(key);
      }
    }
  }

  // Optional: if you want to check for completely new keys in inputAmenities (not in systemAmenities)
  for (let key in inputAmenities) {
    if (!systemAmenities.hasOwnProperty(key) && inputAmenities[key] === true) {
      added.push(key);
    }
  }


  return { added, removed };
}

module.exports = getSystemAmenities;