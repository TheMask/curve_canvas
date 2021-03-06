/**
 * Circlular.js for generating a circular path from 3 points
**/

/**
 * Accept an array of 3 points to render the circular path though
**/

Circular = function( path, length ) {
  this.length = length;
  this.path = path;
  var matA = [[], []];
  var matB = [[], []];
   
  /**
   * matA = [ x1-x2 y1-y2 ]
   *        [ x2-x3 y2-y3 ]
   *
   * matB = [ (x1-x2)^2 + (y1-y2)^2 ]
   *        [ (x2-x3)^2 + (y2-y3)^2 ]
  **/
  var abs = Math.abs;
  matA[0][0] = 2 * ( path[0].x - path[1].x );
  matA[0][1] = 2 * ( path[0].y - path[1].y );
  matA[1][0] = 2 * ( path[1].x - path[2].x );
  matA[1][1] = 2 * ( path[1].y - path[2].y );
  //console.log('hi');
  //console.log(path);
  //console.log(matA)
  matB[0] = ( path[0].x ^ 2 - path[1].x ^ 2 ) + ( path[0].y ^ 2  - path[1].y ^ 2 );
  matB[1] = ( path[1].x ^ 2 - path[2].x ^ 2 ) + ( path[1].y ^ 2  - path[2].y ^ 2 );
  this.centre = this.solveLinearEquations( matA, matB );
  this.radius = ( ( this.centre.h - path[0].x ) ^ 2 + (this.centre.k - path[0].y ) ^ 2 ) ^ 0.5;
};

/**
 * Solve a pair linear equations defined by coefficient matrix = matrix1, and
 * constant matrix = matrix2
 * If a1*h + b1*k = c1, and a2*h + b2*k = c2
 * matrix1 = [ a1 b1 ]
 *           [ a2 b2 ]
 * matrix2 = [ c1 ]
 *           [ c2 ]
 * matrix1 * [ h ] = matrix2
 *           [ k ] 
 * h = det [ c1 b1 ]  / det [ a1 b1 ]
 *         [ c2 b2 ]        [ a2 b2 ]
**/
Circular.prototype.solveLinearEquations = function( matrix1, matrix2 ) {
  var det1 = matrix1[0][0] * matrix1[1][1] - matrix1[0][1] * matrix1[1][0];
  var det2 = matrix2[0] * matrix1[1][1] - matrix2[1] * matrix1[0][1];
  var det3 = matrix2[1] * matrix1[0][0] - matrix2[0] * matrix1[1][0];
  var h = det2 / det1;
  var k = det3 / det1;
  return { 'h': h, 'k': k };
};

Circular.prototype.Y = function( x, centre, radius ) {
  centre = this.centre;
  radius = this.radius;
  var yval = ( ( radius ^ 2 - ( x - centre.h ) ^ 2 ));
  return yval;
};
