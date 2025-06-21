// Fetch base64 encoded Bare URL, decode it, then set UV config
fetch('bare/bare.txt')
  .then(response => {
    if (!response.ok) throw new Error('Failed to load /bare/bare.txt');
    return response.text();
  })
  .then(encodedBareUrl => {
    encodedBareUrl = encodedBareUrl.trim(); // Remove whitespace/newlines

    // Decode base64 to get the real Bare URL
    const bareUrl = atob(encodedBareUrl);

    self.__uv$config = {
      prefix: '/static/load/',
      bare: bareUrl,  // Use decoded URL
      encodeUrl: Ultraviolet.codec.xor.encode,
      decodeUrl: Ultraviolet.codec.xor.decode,
      handler: '/static/uv/uv.handler.js',
      bundle: '/static/uv/uv.bundle.js',
      config: '/static/uv/uv.config.js',
      sw: '/static/uv/uv.sw.js',
    };

    console.log('Ultraviolet configured with decoded Bare URL:', bareUrl);

    // Optionally initialize/start proxy here
  })
  .catch(error => {
    console.error('Error loading or decoding Bare URL:', error);
  });
