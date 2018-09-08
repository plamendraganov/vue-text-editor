<template>
  <div id="app">
    <div class="container">
        <div class="row">
          <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 form-group">
              <label for="message">Write us a message</label><br>
              <textarea
                      id="message"
                      rows="5"
                      class="form-control"
                      placeholder="Type your message here"
                      v-model.lazy="message"></textarea>
          </div>
        </div>

        <div class="row">
            <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                <button class="btn btn-primary" @click="addItem">Submit</button>
                <button class="btn btn-danger" @click="undoItem">Undo</button>
            </div>
        </div>

        <hr>

        <div class="row">
            <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
              <div v-if="messageBox.length">
                <h4 class="resultBox" 
                v-if="sentMessage">Your sent message is: <span v-colorized>{{ currentItem }}</span></h4>

                <h4 class="resultBox" 
                v-else>Your previous message was: <span v-colorized:previous="'red'">{{ currentItem }}</span></h4>
              </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      message: '',
      messageBox: [],
      currentItem: '',
      sentMessage: true
    }
  },
  methods: {
    addItem(){
      if(!this.message == ''){
        this.messageBox.push(this.message);
        this.message = '';
        this.currentItem = this.messageBox[this.messageBox.length - 1];
        this.sentMessage = true;
      }
    },
    undoItem(messageBox){
      this.messageBox.pop();
      this.currentItem = this.messageBox[this.messageBox.length - 1];
      this.sentMessage = false;
    }
  }
}
</script>

<style>
  .container {
    width: 80%;
    margin: 0 auto;
    margin-top: 100px;
  }
  .row {
    text-align: center;
  }

  .resultBox {
    white-space: pre;
  }
</style>
