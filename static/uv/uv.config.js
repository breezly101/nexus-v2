fetch('bare/bare.txt')
  .then(response => {
    if (!response.ok) throw new Error('Failed to load bare/bare.txt');
    return response.text();
  })
  .then(encodedBareUrl => {
    console.log('Raw fetched base64:', JSON.stringify(encodedBareUrl));

    encodedBareUrl = encodedBareUrl.trim();
    const bareUrl = atob(encodedBareUrl);

    console.log('Decoded Bare URL:', bareUrl);

    self.__uv$config = {
      prefix: '/static/load/',
      bare: bareUrl,
      encodeUrl: Ultraviolet.codec.xor.encode,
      decodeUrl: Ultraviolet.codec.xor.decode,
      handler: '/static/uv/uv.handler.js',
      bundle: '/static/uv/uv.bundle.js',
      config: '/static/uv/uv.config.js',
      sw: '/static/uv/uv.sw.js',
    };
  })
  .catch(error => {
    console.error('Error loading or decoding Bare URL:', error);
  });
