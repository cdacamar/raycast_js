window.addEventListener('load', function() {
  var cvs      = document.getElementById('screen');
  var graphics = cvs.getContext('2d');

  // create game
  var game = new Game();
  game.init(graphics);

  // create frame requester
  var rqstFrame = window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            window.oRequestAnimationFrame      ||
            window.msRequestAnimationFrame     ||
            null;

  var processFrame = function() {
    game.update();
    game.draw(graphics);

    rqstFrame(processFrame);
  };

  // start the whole shebang!
  processFrame();
});


// Game assets
var Metrics = function(w, h) {
  this.Width  = w;
  this.Height = h;
};

var Screen = {
  Metrics: new Metrics(640, 480)
};

var World = {
  Map: {
    Metrics: new Metrics(24,24),
    Data:[
      [ 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 4, 4, 6, 4, 4, 6, 4, 6, 4, 4, 4, 6, 4 ],
      [ 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4 ],
      [ 8, 0, 3, 3, 0, 0, 0, 0, 0, 8, 8, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6 ],
      [ 8, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6 ],
      [ 8, 0, 3, 3, 0, 0, 0, 0, 0, 8, 8, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4 ],
      [ 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 4, 0, 0, 0, 0, 0, 6, 6, 6, 0, 6, 4, 6 ],
      [ 8, 8, 8, 8, 0, 8, 8, 8, 8, 8, 8, 4, 4, 4, 4, 4, 4, 6, 0, 0, 0, 0, 0, 6 ],
      [ 7, 7, 7, 7, 0, 7, 7, 7, 7, 0, 8, 0, 8, 0, 8, 0, 8, 4, 0, 4, 0, 6, 0, 6 ],
      [ 7, 7, 0, 0, 0, 0, 0, 0, 7, 8, 0, 8, 0, 8, 0, 8, 8, 6, 0, 0, 0, 0, 0, 6 ],
      [ 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 6, 0, 0, 0, 0, 0, 4 ],
      [ 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 6, 0, 6, 0, 6, 0, 6 ],
      [ 7, 7, 0, 0, 0, 0, 0, 0, 7, 8, 0, 8, 0, 8, 0, 8, 8, 6, 4, 6, 0, 6, 6, 6 ],
      [ 7, 7, 7, 7, 0, 7, 7, 7, 7, 8, 8, 4, 0, 6, 8, 4, 8, 3, 3, 3, 0, 3, 3, 3 ],
      [ 2, 2, 2, 2, 0, 2, 2, 2, 2, 4, 6, 4, 0, 0, 6, 0, 6, 3, 0, 0, 0, 0, 0, 3 ],
      [ 2, 2, 0, 0, 0, 0, 0, 2, 2, 4, 0, 0, 0, 0, 0, 0, 4, 3, 0, 0, 0, 0, 0, 3 ],
      [ 2, 0, 0, 0, 0, 0, 0, 0, 2, 4, 0, 0, 0, 0, 0, 0, 4, 3, 0, 0, 0, 0, 0, 3 ],
      [ 1, 0, 0, 0, 0, 0, 0, 0, 1, 4, 4, 4, 4, 4, 6, 0, 6, 3, 3, 0, 0, 0, 3, 3 ],
      [ 2, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 1, 2, 2, 2, 6, 6, 0, 0, 5, 0, 5, 0, 5 ],
      [ 2, 2, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 2, 2, 0, 5, 0, 5, 0, 0, 0, 5, 5 ],
      [ 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 5, 0, 5, 0, 5, 0, 5, 0, 5 ],
      [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5 ],
      [ 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 5, 0, 5, 0, 5, 0, 5, 0, 5 ],
      [ 2, 2, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 2, 2, 0, 5, 0, 5, 0, 0, 0, 5, 5 ],
      [ 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 5, 5, 5, 5, 5, 5, 5, 5, 5 ]]
  },
  Textures: {
    Metrics: new Metrics(64, 64),
    Data: []
  },
  Sprites: {
    Metrics: new Metrics(64, 64),
    Data: []
  }
};

var Texture = function() {
  this.Pixels = [];

  this.Pixels[World.Textures.Metrics.Height * World.Textures.Metrics.Width - 1] = undefined;
};

var Sprite = function(x, y, tex) {
  this.x = x;
  this.y = y;
  this.texture = tex;
};

var Color = function(colorRGBA) {
  this.setFromRGBA(colorRGBA);
};
Color.prototype.setFromRGBA = function(colorRGBA) {
  this.r = (colorRGBA >>> 24); // we need to shift this as a signed num
  this.g = ((colorRGBA >> 16) & 0x00FF);
  this.b = ((colorRGBA >> 8) & 0x0000FF);
  this.a = (colorRGBA & 0x000000FF);
};
Color.prototype.toRGBA = function() {
  return (this.r << 24) | (this.g << 16) | (this.b << 8) | (this.a);
};

var Player = function() {
  // initial start x/y
  this.posX = 22.0;
  this.posY = 11.5;

  // initial direction
  this.dirX = -1.0;
  this.dirY = 0.0;

  // the 2d raycaster version of camera plane
  this.planeX = 0.0;
  this.planeY = 0.66;
};

var FPSCounter = function() {
  var initTime  = 0;
  var startTime = 0;
  var font = "bold 10px Arial";

  return {
    frameTime: 0,
    init: function() {
      initTime = new Date().getTime();
    },
    getTicks: function() {
      return new Date().getTime() - initTime;
    },
    update: function() {
      var oldTime    = startTime;
      startTime      = this.getTicks();
      this.frameTime = (startTime - oldTime) / 1000.0;
    },
    getFPS: function(){
      return 1.0 / this.frameTime;
    },
    renderFPS: function(ctx) {
      ctx.font      = font;
      ctx.fillStyle = "yellow";
      ctx.fillText(this.getFPS().toFixed(0),10,10);
    }
  };
};

// main draw
var Game = function() {
  // drawing
  var imgData;
  var ZBuffer  = [];

  // input
  var keyDown  = [];
  var keyPress = [];
  var KeyID = {
    // movement
    W: 87,
    A: 65,
    S: 83,
    D: 68,

    // special keys
    T: 84,
    Z: 90,
    X: 88
  };

  // logic
  var fps = new FPSCounter();

  // game
  var player       = new Player();
  var drawSprites  = true;
  var drawGeometry = true;
  var showFPS      = true;

  return {

// Game functions
dataArrayToColorArray: function(data, width, height) {
  var result = [];
  result[width * height - 1] = undefined;
  for (var y = 0;y < height;++y) {
    for (var x = 0;x < width;++x) {
      var index = (y * height + x) * 4;
      result[y * height + x] = /* r = */ (data[index] << 24) | /* g = */ (data[index + 1] << 16) | /* b = */ (data[index + 2] << 8) | /* a = */ (data[index + 3]);
    }
  }
  return result;
},

imgToColorArray: function(img, ctx) {
  ctx.drawImage(img, 0, 0);
  return this.dataArrayToColorArray(ctx.getImageData(0, 0, img.width, img.height).data, img.width, img.height);
},

imgToTexture: function(img, ctx) {
  var tex = new Texture();
  tex.Pixels = this.imgToColorArray(img, ctx);
  return tex;
},

init: function(ctx) {
  // input processing
  window.onkeydown = this.handleKeydown;
  window.onkeyup   = this.handleKeyup;

  // fps initialization
  fps.init();

  // buffer initialization
  imgData = ctx.getImageData(0, 0, Screen.Metrics.Width, Screen.Metrics.Height);
  ZBuffer[Screen.Metrics.Width - 1] = undefined;

  // create textures
  /* uncomment for generated textures
  for (var x = 0;x < World.Textures.Metrics.Width;++x) {
    for (var y = 0;y < World.Textures.Metrics.Height;++y) {
      for (var t = 0;t != 12;++t) {
        World.Textures.Data[t].Pixels[World.Textures.Metrics.Width * y + x] = 0xC00000 * ((x % 16) && (y % 16) && 1);
      }
    }
  }
  */

  World.Textures.Data = [
    // Walls
    this.imgToTexture(document.getElementById('eagle'), ctx),
    this.imgToTexture(document.getElementById('brick'), ctx),
    this.imgToTexture(document.getElementById('purple_stone'), ctx),
    this.imgToTexture(document.getElementById('cobble'), ctx),
    this.imgToTexture(document.getElementById('bluebrick'), ctx),
    this.imgToTexture(document.getElementById('cobble_moss'), ctx),
    this.imgToTexture(document.getElementById('wood'), ctx),
    this.imgToTexture(document.getElementById('cobble_colored'), ctx),

    // Sprites
    this.imgToTexture(document.getElementById('barrel'), ctx),
    this.imgToTexture(document.getElementById('column'), ctx),
    this.imgToTexture(document.getElementById('lamp2'), ctx),
    this.imgToTexture(document.getElementById('troll'), ctx)
  ];

  // Sprites
  World.Sprites.Data = [
    new Sprite(20.5, 11.5, 10), //green light in front of playerstart
    //green lights in every room
    new Sprite(18.5, 4.5, 10),
    new Sprite(10.0, 4.5, 10),
    new Sprite(10.0, 12.5, 10),
    new Sprite(3.5, 6.5, 10),
    new Sprite(3.5, 20.5, 10),
    new Sprite(3.5, 14.5, 10),
    new Sprite(14.5, 20.5, 10),

    //row of pillars in front of wall: fisheye test
    new Sprite(18.5, 10.5, 9),
    new Sprite(18.5, 11.5, 9),
    new Sprite(18.5, 12.5, 9),

    //some barrels around the map
    new Sprite(21.5, 1.5, 8),
    new Sprite(15.5, 1.5, 8),
    new Sprite(16.0, 1.8, 8),
    new Sprite(16.2, 1.2, 8),
    new Sprite(9.5, 15.5, 8),
    new Sprite(10.0, 15.1, 8),
    new Sprite(10.5, 15.8, 8),

    // lol
    new Sprite(3.5, 2.5, 11)
  ];
},

clearBuffer: function() {
  var black = new Color(0x00000000);
  for (var x = 0;x < Screen.Metrics.Width;++x) {
    for (var y = 0;y < Screen.Metrics.Height;++y) {
      var index = (y * Screen.Metrics.Width + x) * 4;
      imgData.data[index++] = black.r;
      imgData.data[index++] = black.g;
      imgData.data[index++] = black.b;
      imgData.data[index] = 0xC0; // give it that gray color
    }
  }
},

draw: function(ctx) {
  // geometry calculations
  {
    for (var x = 0;x < Screen.Metrics.Width;++x) {
      var cameraX = 2.0 * x / Screen.Metrics.Width - 1; // x-coord in camera space
      var rayPosX = player.posX;
      var rayPosY = player.posY;
      var rayDirX = player.dirX + player.planeX * cameraX;
      var rayDirY = player.dirY + player.planeY * cameraX;

      // which box of the map we're in
      var mapX = Math.floor(rayPosX);
      var mapY = Math.floor(rayPosY);

      // length of the ray from the current position to the next x or y-side
      var sideDistX;
      var sideDistY;

      // length of ray from one x or y-side to the next x or y-side
      var deltaDistX = Math.sqrt(1 + (rayDirY * rayDirY) / (rayDirX * rayDirX));
      var deltaDistY = Math.sqrt(1 + (rayDirX * rayDirX) / (rayDirY * rayDirY));
      var perpWallDist;

      // what direction to step in x or y-direction (either +1 or -1)
      var stepX;
      var stepY;

      var hit  = false; // was there a wall hit?
      var side = false; // was a NS or EW wall hit?

      // calculate step and initial sideDist
      if (rayDirX < 0) {
        stepX = -1;
        sideDistX = (rayPosX - mapX) * deltaDistX;
      }
      else {
        stepX = 1;
        sideDistX = (mapX + 1.0 - rayPosX) * deltaDistX;
      }

      if (rayDirY < 0) {
        stepY = -1;
        sideDistY = (rayPosY - mapY) * deltaDistY;
      }
      else {
        stepY = 1;
        sideDistY = (mapY + 1.0 - rayPosY) * deltaDistY;
      }

      // perform DDA
      while (!hit) {
        // jump to the next map square or in x-direction or y-direction
        if (sideDistX < sideDistY) {
          sideDistX += deltaDistX;
          mapX      += stepX;
          side      = false;
        }
        else {
          sideDistY += deltaDistY;
          mapY      += stepY;
          side      = true;
        }
        // check if ray has hit a wall
        hit = World.Map.Data[mapX][mapY] > 0;
      }

      // calculate lowest and highest pixel to fill in current stripe
      if (!side) {
        perpWallDist = (mapX - rayPosX + (1 - stepX) / 2) / rayDirX;
      }
      else {
        perpWallDist = (mapY - rayPosY + (1 - stepY) / 2) / rayDirY;
      }

      // calculate line height of line to draw on screen
      var lineHeight = Math.floor(Screen.Metrics.Height / perpWallDist);

      // calculate lowest and highest pixel to fill in current stripe
      var drawStart = -Math.floor(lineHeight / 2) + Math.floor(Screen.Metrics.Height / 2);
      if (drawStart < 0) {
        drawStart = 0;
      }
      var drawEnd = Math.floor(lineHeight / 2) + Math.floor(Screen.Metrics.Height / 2);
      if (drawEnd >= Screen.Metrics.Height) {
        drawEnd = Screen.Metrics.Height - 1;
      }

      // texturing calculations
      var texNum = World.Map.Data[mapX][mapY] - 1;

      // calculate value of wallX
      var wallX; // where exactly the wall was hit
      if (!side) {
        wallX = rayPosY + perpWallDist * rayDirY;
      }
      else {
        wallX = rayPosX + perpWallDist * rayDirX;
      }
      wallX -= Math.floor(wallX);

      // x coordinate on texture
      var texX = Math.floor(wallX * World.Textures.Metrics.Width);
      if (!side && rayDirX > 0) {
        texX = World.Textures.Metrics.Width - texX - 1;
      }
      if (side && rayDirY < 0) {
        texX = World.Textures.Metrics.Width - texX - 1;
      }

      var color = new Color(0x00000000);
      for (var y = drawStart;y < drawEnd && drawGeometry;++y) {
        var d = y * 256 - Screen.Metrics.Height * 128 + lineHeight * 128;
        var texY = Math.floor(((d * World.Textures.Metrics.Height) / lineHeight) / 256);
        var colorRGBA = World.Textures.Data[texNum].Pixels[World.Textures.Metrics.Height * texY + texX];
        if (side) {
          colorRGBA = ((colorRGBA >>> 1) & 0x7F7F7F7F) | (colorRGBA & 0x000000FF); // darken
        }
        color.setFromRGBA(colorRGBA);
        var index = (y * Screen.Metrics.Width + x) * 4;
        imgData.data[index++] = color.r;
        imgData.data[index++] = color.g;
        imgData.data[index++] = color.b;
        imgData.data[index]   = color.a;
      }

      // save ZBuffer for sprites
      ZBuffer[x] = perpWallDist;
    }
  } // Draw Gemoetry

  if (drawSprites) {
    var spriteOrder = [];
    for (var i = 0;i != World.Sprites.Data.length;++i) {
      spriteOrder[i] = { Index: i, Distance: ((player.posX - World.Sprites.Data[i].x) * (player.posX - World.Sprites.Data[i].x) + (player.posY - World.Sprites.Data[i].y) * (player.posY - World.Sprites.Data[i].y)) }; // sqrt not taken, unnecessary
    }
    spriteOrder.sort(function(a, b) { return b.Distance - a.Distance; });

    for (var i = 0;i != World.Sprites.Data.length;++i) {
      // translate sprite position relative to camera
      var spriteX = World.Sprites.Data[spriteOrder[i].Index].x - player.posX;
      var spriteY = World.Sprites.Data[spriteOrder[i].Index].y - player.posY;

      //transform sprite with the inverse camera matrix
      // [ planeX   dirX ] -1                                       [ dirY      -dirX ]
      // [               ]       =  1/(planeX*dirY-dirX*planeY) *   [                 ]
      // [ planeY   dirY ]                                          [ -planeY  planeX ]
      var invDet = 1.0 / (player.planeX * player.dirY - player.dirX * player.planeY);

      var transformX = invDet * (player.dirY * spriteX - player.dirX * spriteY);
      var transformY = invDet * (-player.planeY * spriteX + player.planeX * spriteY);

      var spriteScreenX = Math.floor((Screen.Metrics.Width / 2) * (1 + transformX / transformY));

      var vMoveScreen = Math.floor(0.0 / transformY);

      // calculate height of sprite on screen
      var spriteHeight = Math.abs(Math.floor(Screen.Metrics.Height / transformY)) / 1;
      // calculate lowest and highest pixel to fill current stripe
      var drawStartY = -Math.floor(spriteHeight / 2) + Math.floor(Screen.Metrics.Height / 2) + vMoveScreen;
      if (drawStartY < 0) {
        drawStartY = 0;
      }
      var drawEndY = Math.floor(spriteHeight / 2) + Math.floor(Screen.Metrics.Height / 2) + vMoveScreen;
      if (drawEndY >= Screen.Metrics.Height) {
        drawEndY = Screen.Metrics.Height - 1;
      }

      // calculate width of the sprite
      var spriteWidth = Math.abs(Math.floor(Screen.Metrics.Height / transformY)) / 1;
      var drawStartX = -Math.floor(spriteWidth / 2) + spriteScreenX;
      if (drawStartX < 0) {
        drawStartX = 0;
      }
      var drawEndX = Math.floor(spriteWidth / 2) + spriteScreenX;
      if (drawEndX >= Screen.Metrics.Width) {
        drawEndX = Screen.Metrics.Width - 1;
      }

      // loop through every vertical stripe of sprite on screen
      for (var stripe = drawStartX;stripe < drawEndX;++stripe) {
        var texX = Math.floor((256 * (stripe - (-spriteWidth / 2 + spriteScreenX)) * World.Textures.Metrics.Width / spriteWidth) / 256);
        // the conditions in the if are:
        // 1) it's in front of the camera plane so you don't see things behind you
        // 2) it's on the screen (left)
        // 3) it's on the screen (right)
        // 4) ZBuffer perpendicular distance
        if (transformY > 0 && stripe > 0 && stripe < Screen.Metrics.Width && transformY < ZBuffer[stripe]) {
          for (var y = drawStartY;y < drawEndY;++y) {
            var d    = Math.floor((y - vMoveScreen) * 256 - Screen.Metrics.Height * 128 + spriteHeight * 128);
            var texY = Math.floor(((d * World.Textures.Metrics.Height) / spriteHeight) / 256);
            var colorRGBA = World.Textures.Data[World.Sprites.Data[spriteOrder[i].Index].texture].Pixels[World.Textures.Metrics.Height * texY + texX];
            if ((colorRGBA & 0xFFFFFF00) != 0) {
              color.setFromRGBA(colorRGBA);
              var index = (y * Screen.Metrics.Width + stripe) * 4;
              imgData.data[index++] = color.r;
              imgData.data[index++] = color.g;
              imgData.data[index++] = color.b;
              imgData.data[index]   = color.a;
            }
          }
        }
      }
    }
  }
  ctx.putImageData(imgData, 0, 0);
  this.clearBuffer();

  // show fps
  if (showFPS) {
    fps.renderFPS(ctx);
  }
},

update: function() {
  fps.update();

  var moveSpeed = fps.frameTime * 5.0;
  var rotSpeed  = fps.frameTime * 3.0;

  if (keyDown[KeyID.W]) {
    console.log('moving forward!');
    if (World.Map.Data[Math.floor(player.posX + player.dirX * moveSpeed)][Math.floor(player.posY)] == 0) {
      player.posX += player.dirX * moveSpeed;
    }
    if (World.Map.Data[Math.floor(player.posX)][Math.floor(player.posY + player.dirY * moveSpeed)] == 0) {
      player.posY += player.dirY * moveSpeed;
    }
  }
  else if (keyDown[KeyID.S]) {
    console.log('moving back!');
    if (!World.Map.Data[Math.floor(player.posX - player.dirX * moveSpeed)][Math.floor(player.posY)]) {
      player.posX -= player.dirX * moveSpeed;
    }
    if (!World.Map.Data[Math.floor(player.posX)][Math.floor(player.posY - player.dirY * moveSpeed)]) {
      player.posY -= player.dirY * moveSpeed;
    }
  }
  if (keyDown[KeyID.A]) {
    console.log('turning left!');
    var oldDirX = player.dirX;
    player.dirX = player.dirX * Math.cos(rotSpeed) - player.dirY * Math.sin(rotSpeed);
    player.dirY = oldDirX * Math.sin(rotSpeed) + player.dirY * Math.cos(rotSpeed);
    var oldPlaneX = player.planeX;
    player.planeX = player.planeX * Math.cos(rotSpeed) - player.planeY * Math.sin(rotSpeed);
    player.planeY = oldPlaneX * Math.sin(rotSpeed) + player.planeY * Math.cos(rotSpeed);
  }
  else if (keyDown[KeyID.D]) {
    console.log('turning right!');
    var oldDirX = player.dirX;
    player.dirX = player.dirX * Math.cos(-rotSpeed) - player.dirY * Math.sin(-rotSpeed);
    player.dirY = oldDirX * Math.sin(-rotSpeed) + player.dirY * Math.cos(-rotSpeed);
    var oldPlaneX = player.planeX;
    player.planeX = player.planeX * Math.cos(-rotSpeed) - player.planeY * Math.sin(-rotSpeed);
    player.planeY = oldPlaneX * Math.sin(-rotSpeed) + player.planeY * Math.cos(-rotSpeed);
  }

  // special keys
  if (keyPress[KeyID.T]) {
    // toggle FPS
    showFPS = !showFPS;
  }
  if (keyPress[KeyID.Z]) {
    // toggle geometry drawing
    drawGeometry = !drawGeometry;
  }
  if (keyPress[KeyID.X]) {
    // toggle sprites
    drawSprites = !drawSprites;
  }

  // clear pressed keys
  keyPress = [];
},

handleKeydown: function(e) {
  keyDown[e.keyCode] = true;
},

handleKeyup: function(e) {
  keyPress[e.keyCode] = true;
  keyDown[e.keyCode] = false;
}

}; // return Game (functions)

}; // Game