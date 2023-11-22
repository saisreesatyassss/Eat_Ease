import React, { useState, useEffect } from 'react';

const LocationComponent = () => {
  const [address, setAddress] = useState('');
  const [location, setLocation] = useState(null);

const handleLocationSearch = () => {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
      },
      (error) => {
        console.error('Error getting location:', error.message);
        if (error.code === error.PERMISSION_DENIED) {
          // If user denies geolocation, prompt them to enable it
          const enableLocation = window.confirm(
            'To use this feature, please enable location services in your browser settings.'
          );

          if (enableLocation) {
            // Redirect to browser settings page to enable geolocation
            window.location.href = 'https://support.google.com/chrome/answer/142065?co=GENIE.Platform%3DDesktop&hl=en';
          } else {
            setAddress('Geolocation denied');
          }
        } else {
          setAddress('Error getting location');
        }
      }
    );
  } else {
    console.error('Geolocation is not supported by your browser.');
    setAddress('Geolocation not supported');
  }
};


  useEffect(() => {
    if (location) {
      const apiKey = '2cad6b09192d480a90820a45e03b3b1e';
      const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${location.latitude}+${location.longitude}&key=${apiKey}`;

      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          if (data.results && data.results.length > 0) {
            const formattedAddress = data.results[0].formatted;
     const modifiedAddress = formattedAddress.replace(/Unnamed Road,?/i, '');

            setAddress(modifiedAddress);
          } else {
            setAddress('Address not found');
          }
        })
        .catch((error) => {
          console.error('Error fetching address:', error);
          setAddress('Error fetching address');
        });
    }
  }, [location]);

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="Enter your address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          style={{ marginRight: '10px', padding: '5px' }}
        />
        <button onClick={handleLocationSearch}>
          <span role="img" aria-label="Location icon">
            📍
          </span>
        </button>
      </div>

      {location ? (
        <div>
          <h2>Your Current Location:</h2>
          <p>Latitude: {location.latitude}</p>
          <p>Longitude: {location.longitude}</p>
          {address && <p>Address: {address}</p>}
        </div>
      ) : (
        <p>Click the location icon to find your current location.</p>
      )}
    </div>
  );
};

export default LocationComponent;
