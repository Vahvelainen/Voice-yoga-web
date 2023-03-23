
// Now a generic test for cheking with function and giving pass or fail

export default class PoseCheck {
  pass = false
  test = p => false

  constructor(test_function) {
    this.test = test_function
    this.pass = false
  }

  check() {
    // Need to think what we want here
    this.pass = this.test()
  }

}
