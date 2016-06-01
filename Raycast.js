var c   = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

var Screen = {
  Height: 480,
  Width:  640
};

var Sprite = function(x, y, tex) {
  this.x = x;
  this.y = y;
  this.texture = tex;
};

var World = {
  Height: 24,
  Width: 24,
  Textures: { Height:64, Width:64 },
  Map:[
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
  [ 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 5, 5, 5, 5, 5, 5, 5, 5, 5 ]],
  Sprites: [
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
  ]
};

var Texture = function() {
  this.Pixels = [];

  this.Pixels[World.Textures.Height * World.Textures.Width - 1] = undefined;
};

var Color = function(colorRGB) {
  this.setFromRGB(colorRGB);
};
Color.prototype.setFromRGB = function(colorRGB) {
  this.r = (colorRGB >> 16);
  this.g = ((colorRGB >> 8) & 0x00FF);
  this.b = (colorRGB & 0x0000FF);
  this.a = 0xFF;
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
var player = new Player();

var fps = {
  initTime: 0,
  startTime: 0,
  frameTime: 0,
  font:"bold 10px Arial",
  initFPS: function() {
    this.initTime = new Date().getTime();
  },
  getTicks: function() {
    return new Date().getTime() - this.initTime;
  },
  getFPS: function(){
    var oldTime    = this.startTime;
    this.startTime = fps.getTicks();
    this.frameTime = (this.startTime - oldTime) / 1000.0;

    return 1.0 / this.frameTime;
  },
  renderFPS: function(ctx) {
    ctx.font      = fps.font;
    ctx.fillStyle = "yellow";
    ctx.fillText(fps.getFPS().toFixed(0),10,10);
  }
};

// main draw
var imgData;
var ZBuffer  = [];
var textures = [];

var dataArrayToColorArray = function(data, width, height) {
  var result = [];
  result[width * height - 1] = undefined;
  for (var y = 0;y < height;++y) {
    for (var x = 0;x < width;++x) {
      var index = (y * height + x) * 4;
      result[y * height + x] = /*r = */ (data[index] << 16) | /* g = */ (data[index + 1] << 8) | /* b = */ (data[index + 2]);
    }
  }
  return result;
};

var imgToColorArray = function(img) {
  ctx.drawImage(img, 0, 0);
  return dataArrayToColorArray(ctx.getImageData(0, 0, img.width, img.height).data, img.width, img.height);
};

var initDraw = function() {
  fps.initFPS();
  imgData = ctx.getImageData(0, 0, Screen.Width, Screen.Height);

  // ZBuffer
  ZBuffer[Screen.Width - 1] = undefined;

  // create textures
  for (var t = 0;t != 12;++t) textures[t] = new Texture();
  /* uncomment for generated textures
  for (var x = 0;x < World.Textures.Width;++x) {
    for (var y = 0;y < World.Textures.Height;++y) {
      for (var t = 0;t != 8;++t) {
        textures[t].Pixels[World.Textures.Width * y + x] = 0xC00000 * ((x % 16) && (y % 16) && 1);
      }
    }
  }
  */

  textures[0].Pixels = imgToColorArray(document.getElementById('eagle'));
  textures[1].Pixels = imgToColorArray(document.getElementById('brick'));
  textures[2].Pixels = imgToColorArray(document.getElementById('purple_stone'));
  textures[3].Pixels = imgToColorArray(document.getElementById('cobble'));
  textures[4].Pixels = imgToColorArray(document.getElementById('bluebrick'));
  textures[5].Pixels = imgToColorArray(document.getElementById('cobble_moss'));
  textures[6].Pixels = imgToColorArray(document.getElementById('wood'));
  textures[7].Pixels = imgToColorArray(document.getElementById('cobble_colored'));

  textures[8].Pixels  = imgToColorArray(document.getElementById('barrel'));
  textures[9].Pixels  = imgToColorArray(document.getElementById('column'));
  textures[10].Pixels = imgToColorArray(document.getElementById('lamp2'));
  textures[11].Pixels = imgToColorArray(document.getElementById('troll'));
};

var clearBuffer = function() {
  var black = new Color(0x000000);
  for (var x = 0;x < Screen.Width;++x) {
    for (var y = 0;y < Screen.Height;++y) {
      var index = (y * Screen.Width + x) * 4;
      imgData.data[index++] = black.r;
      imgData.data[index++] = black.g;
      imgData.data[index++] = black.b;
      imgData.data[index] = 0xC0;
    }
  }
};

var draw = function() {
  //if (false) // uncomment if only testing FPS of recursive canvas calls
  {
    for (var x = 0;x < Screen.Width;++x) {
      var cameraX = 2.0 * x / Screen.Width - 1; // x-coord in camera space
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
        hit = World.Map[mapX][mapY] > 0;
      }

      // calculate lowest and highest pixel to fill in current stripe
      if (!side) {
        perpWallDist = (mapX - rayPosX + (1 - stepX) / 2) / rayDirX;
      }
      else {
        perpWallDist = (mapY - rayPosY + (1 - stepY) / 2) / rayDirY;
      }

      // calculate line height of line to draw on screen
      var lineHeight = Math.floor(Screen.Height / perpWallDist);

      // calculate lowest and highest pixel to fill in current stripe
      var drawStart = Math.floor(-lineHeight / 2 + Screen.Height / 2);
      if (drawStart < 0) {
        drawStart = 0;
      }
      var drawEnd = lineHeight / 2 + Screen.Height / 2;
      if (drawEnd >= Screen.Height) {
        drawEnd = Screen.Height - 1;
      }

      // texturing calculations
      var texNum = World.Map[mapX][mapY] - 1;

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
      var texX = Math.floor(wallX * World.Textures.Width);
      if (!side && rayDirX > 0) {
        texX = World.Textures.Width - texX - 1;
      }
      if (side && rayDirY < 0) {
        texX = World.Textures.Width - texX - 1;
      }

      var color = new Color(0x000000);
      for (var y = drawStart;y < drawEnd;++y) {
        var d = y * 256 - Screen.Height * 128 + lineHeight * 128;
        var texY = Math.floor(((d * World.Textures.Height) / lineHeight) / 256);
        var colorRGB = textures[texNum].Pixels[World.Textures.Height * texY + texX];
        if (side) {
          colorRGB = (colorRGB >> 1) & 0x7F7F7F; // darken
        }
        color.setFromRGB(colorRGB);
        var index = (y * Screen.Width + x) * 4;
        imgData.data[index++] = color.r;
        imgData.data[index++] = color.g;
        imgData.data[index++] = color.b;
        imgData.data[index]   = color.a;
      }

      // save ZBuffer for sprites
      ZBuffer[x] = perpWallDist;
    }

    var spriteOrder = [];
    for (var i = 0;i != World.Sprites.length;++i) {
      spriteOrder[i] = { Index: i, Distance: ((player.posX - World.Sprites[i].x) * (player.posX - World.Sprites[i].x) + (player.posY - World.Sprites[i].y) * (player.posY - World.Sprites[i].y)) }; // sqrt not taken, unnecessary
    }
    spriteOrder.sort(function(a, b) { return b.Distance - a.Distance; });

    for (var i = 0;i != World.Sprites.length;++i) {
      // translate sprite position relative to camera
      var spriteX = World.Sprites[spriteOrder[i].Index].x - player.posX;
      var spriteY = World.Sprites[spriteOrder[i].Index].y - player.posY;

      //transform sprite with the inverse camera matrix
      // [ planeX   dirX ] -1                                       [ dirY      -dirX ]
      // [               ]       =  1/(planeX*dirY-dirX*planeY) *   [                 ]
      // [ planeY   dirY ]                                          [ -planeY  planeX ]
      var invDet = 1.0 / (player.planeX * player.dirY - player.dirX * player.planeY);

      var transformX = invDet * (player.dirY * spriteX - player.dirX * spriteY);
      var transformY = invDet * (-player.planeY * spriteX + player.planeX * spriteY);

      var spriteScreenX = Math.floor((Screen.Width / 2) * (1 + transformX / transformY));

      var vMoveScreen = Math.floor(0.0 / transformY);

      // calculate height of sprite on screen
      var spriteHeight = Math.abs(Math.floor(Screen.Height / transformY)) / 1;
      // calculate lowest and highest pixel to fill current stripe
      var drawStartY = Math.floor(-Math.floor(spriteHeight / 2) + Screen.Height / 2 + vMoveScreen);
      if (drawStartY < 0) {
        drawStartY = 0;
      }
      var drawEndY = Math.floor(spriteHeight / 2 + Screen.Height / 2 + vMoveScreen);
      if (drawEndY >= Screen.Height) {
        drawEndY = Screen.Height - 1;
      }

      // calculate width of the sprite
      var spriteWidth = Math.abs(Math.floor(Screen.Height / transformY)) / 1;
      var drawStartX = -Math.floor(spriteWidth / 2) + spriteScreenX;
      if (drawStartX < 0) {
        drawStartX = 0;
      }
      var drawEndX = Math.floor(spriteWidth / 2 + spriteScreenX);
      if (drawStartX >= Screen.Width) {
        drawEndX = Screen.Width - 1;
      }

      // loop through every vertical stripe of sprite on screen
      for (var stripe = drawStartX;stripe < drawEndX;++stripe) {
        var texX = Math.floor((256 * (stripe - (-spriteWidth / 2 + spriteScreenX)) * World.Textures.Width / spriteWidth) / 256);
        // the conditions in the if are:
        // 1) it's in front of the camera plane so you don't see things behind you
        // 2) it's on the screen (left)
        // 3) it's on the screen (right)
        // 4) ZBuffer perpendicular distance
        if (transformY > 0 && stripe > 0 && stripe < Screen.Width && transformY < ZBuffer[stripe]) {
          for (var y = drawStartY;y < drawEndY;++y) {
            var d    = Math.floor((y - vMoveScreen) * 256 - Screen.Height * 128 + spriteHeight * 128);
            var texY = Math.floor(((d * World.Textures.Height) / spriteHeight) / 256);
            var colorRGB = textures[World.Sprites[spriteOrder[i].Index].texture].Pixels[World.Textures.Height * texY + texX];
            if ((colorRGB & 0xFFFFFFFF) != 0) {
              color.setFromRGB(colorRGB);
              var index = (y * Screen.Width + stripe) * 4;
              imgData.data[index++] = color.r;
              imgData.data[index++] = color.g;
              imgData.data[index++] = color.b;
              imgData.data[index]   = color.a;
            }
          }
        }
      }
    }
    ctx.putImageData(imgData, 0, 0);
    clearBuffer();
  }
  fps.renderFPS(ctx);
};

var keys = [];
var KeyID = {
  W: 87,
  A: 65,
  S: 83,
  D: 68
};
var update = function() {
  var moveSpeed = fps.frameTime * 5.0;
  var rotSpeed  = fps.frameTime * 3.0;

  if (keys[KeyID.W]) {
    console.log('moving forward!');
    if (World.Map[Math.floor(player.posX + player.dirX * moveSpeed)][Math.floor(player.posY)] == 0) {
      player.posX += player.dirX * moveSpeed;
    }
    if (World.Map[Math.floor(player.posX)][Math.floor(player.posY + player.dirY * moveSpeed)] == 0) {
      player.posY += player.dirY * moveSpeed;
    }
  }
  else if (keys[KeyID.S]) {
    console.log('moving back!');
    if (!World.Map[Math.floor(player.posX - player.dirX * moveSpeed)][Math.floor(player.posY)]) {
      player.posX -= player.dirX * moveSpeed;
    }
    if (!World.Map[Math.floor(player.posX)][Math.floor(player.posY - player.dirY * moveSpeed)]) {
      player.posY -= player.dirY * moveSpeed;
    }
  }
  if (keys[KeyID.A]) {
    console.log('turning left!');
    var oldDirX = player.dirX;
    player.dirX = player.dirX * Math.cos(rotSpeed) - player.dirY * Math.sin(rotSpeed);
    player.dirY = oldDirX * Math.sin(rotSpeed) + player.dirY * Math.cos(rotSpeed);
    var oldPlaneX = player.planeX;
    player.planeX = player.planeX * Math.cos(rotSpeed) - player.planeY * Math.sin(rotSpeed);
    player.planeY = oldPlaneX * Math.sin(rotSpeed) + player.planeY * Math.cos(rotSpeed);
  }
  else if (keys[KeyID.D]) {
    console.log('turning right!');
    var oldDirX = player.dirX;
    player.dirX = player.dirX * Math.cos(-rotSpeed) - player.dirY * Math.sin(-rotSpeed);
    player.dirY = oldDirX * Math.sin(-rotSpeed) + player.dirY * Math.cos(-rotSpeed);
    var oldPlaneX = player.planeX;
    player.planeX = player.planeX * Math.cos(-rotSpeed) - player.planeY * Math.sin(-rotSpeed);
    player.planeY = oldPlaneX * Math.sin(-rotSpeed) + player.planeY * Math.cos(-rotSpeed);
  }
};

var mainLoop = function() {
  update();
  draw();
};

var handleKeydown = function(e) {
  keys[e.keyCode] = true;
};

var handleKeyup = function(e) {
  keys[e.keyCode] = false;
};

var animFrame = window.requestAnimationFrame   ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            window.oRequestAnimationFrame      ||
            window.msRequestAnimationFrame     ||
            null;

var recursiveAnim = function() {
  mainLoop();
  animFrame(recursiveAnim);
};

window.onkeydown = handleKeydown;
window.onkeyup   = handleKeyup;
initDraw();
animFrame( recursiveAnim );