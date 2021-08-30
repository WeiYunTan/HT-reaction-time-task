// define the site that hosts stimuli images
// usually https://<your-github-username>.github.io/<your-experiment-name>/
var repo_site = "https://github.com/WeiYunTan/HT-reaction-time-task/tree/main/";


/* create timeline */
var timeline = [];

/* preload images */
var preload = {
  type: 'preload',
  images: ['img/redX.png',] /*change this to name of the red x */
}
timeline.push(preload);

/* define welcome message trial */
var welcome = {
  type: "html-keyboard-response",
  stimulus: "Welcome to the experiment. Press any key to begin." /*ammend the instructions on the 
  page to show what I want them to see about the points thing or that I may not even need to do this */
};
timeline.push(welcome);

/* define instructions trial */
var instructions_general = {
  type: "html-keyboard-response",
  stimulus: `
    <p>In this experiment, a red 'X' will appear in the center 
    of the screen.</p><p>Once you see the red 'X', press the spacebar as fast as you can. 

    <div style='width: 1000px;'>
    <div style='middle'><img src= "img/redX.png"></img>
    <p class='small'><strong>Press the spacebar key</strong></p></div>
    </div>
    <p>There will be 1 practice block and 2 actual blocks in total. </p> 
    <p> <strong> The faster you respond, the higher your points will be. The slower you respond, the lower your 
    points will be. </strong> </p> <p> You can earn up to 65 points in each block. </p>
     <p><strong>Gain 100 points at the end of the task and you will win $20.</strong></p>
    
    <p>Press any key to begin.</p> 
  `,
  post_trial_gap: 2000
};
timeline.push(instructions_general);

var instructions_practice_round = {
  type: "html-keyboard-response",
  stimulus: `
    <p>This will be a practice block. No points will be counted here.</p>
    <p>There will be 5 trials in total.</p>
    <p>Press any key to begin.</p> 
  `,
  post_trial_gap: 2000
};
timeline.push(instructions_practice_round);


/* test trials */
var test_stimuli = [
  { stimulus: "img/redX.png",  correct_response: ' '},
  //{ stimulus: "img/orange.png",  correct_response: 'j'}//
];

/* I think the randomisation of how long the red x takes to appear is essentially how long the fixation
cross is showed for. I should be able to alter the values in the brackets below to change things up */ 
var fixation = {
  type: 'html-keyboard-response',
  stimulus: '<div style="font-size:60px;">+</div>',
  choices: jsPsych.NO_KEYS,
  trial_duration: function(){
    return jsPsych.randomization.sampleWithoutReplacement([250, 500, 750, 1000, 1250, 1500, 1750, 2000], 1)[0];
  },
  data: {
    task: 'fixation'
  }
}

var test = {
  type: "image-keyboard-response",
  stimulus: jsPsych.timelineVariable('stimulus'),
  choices: [' '],
  data: {
    task: 'response',
    correct_response: jsPsych.timelineVariable('correct_response')
  },
  on_finish: function(data){
    data.correct = jsPsych.pluginAPI.compareKeys(data.response, data.correct_response);
  }
}

/* guided response trial */
var guided_test= {
  type:"image-keyboard-response",
  stimulus: jsPsych.timelineVariable('stimulus'),
  choices: [' '],
  prompt:` <div style='width: 1000px;'>
    <div style='middle'> <strong><p>Press the spacebar key</p></strong>`,
  data: {
    task: 'response',
    correct_response: jsPsych.timelineVariable('correct_response')
  },
  on_finish: function(data){
    data.correct = jsPsych.pluginAPI.compareKeys(data.response, data.correct_response);
  }
}


var guided_trial = {
  timeline: [fixation, guided_test],
  timeline_variables: test_stimuli,
}        
timeline.push(guided_trial);

 var practice_trial = {
  timeline: [fixation, test],
  timeline_variables: test_stimuli,
  repetitions: 4,
  randomize_order: true
}
timeline.push(practice_trial);

var instructions_block_1 = {
  type: "html-keyboard-response",
  stimulus: `
    <p>This will be the first block of actual trials. There will be 10 trials in total</p>
    <p><strong>Remember, the faster you respond, the more points you will get. The slower you respond, the less points you wil get.</strong></p>
    <p>Press any key to begin.</p> 
  `,
  post_trial_gap: 1000,
};
timeline.push(instructions_block_1);

var test_procedure_block1 = {
  timeline: [fixation, test],
  timeline_variables: test_stimuli,
  repetitions: 10,
  randomize_order: true
}
timeline.push(test_procedure_block1);

var calculating1 = {
  type: "html-keyboard-response",
  stimulus: 'Calculating your points...',
  choices: jsPsych.NO_KEYS,
  trial_duration: 1000,
};
timeline.push(calculating1);

var block_1_score = {
  type: "html-keyboard-response",
  stimulus: `
    <p>Your cumulative points is <strong> 58 </strong>. </p>
    <p>Next, we shall take a break before starting block 2.</p> 
  `,
  choices: jsPsych.NO_KEYS,
  trial_duration: 2000,
};
timeline.push(block_1_score);

/*add in a break section over here */

var break_screen = {
      type: "html-keyboard-response",
      stimulus: `
        <p>It is time to take a break. We will have a break for 1 minute before continuing</p>
        <p>Your current score is <strong> 58 </strong></p>
        <p>Get 100 points at the end and you will win $20. </p>`
        ,
        
      choices: jsPsych.NO_KEYS,
      trial_duration: 20000 /*60000 */, 
      
    };
    timeline.push(break_screen);

var instructions_block_2 = {
    type: "html-keyboard-response",
     stimulus: `
    <p>This will be the second block of trials. There will be 10 trials in total</p>
    <p><strong>Remember, the faster you respond, the more points you will get. The slower you respond, the less points you wil get.</strong></p>
    <p>Press any key to begin.</p> 
  `,
  post_trial_gap: 1000,
};
timeline.push(instructions_block_2);

var test_procedure_block2 = {
  timeline: [fixation, test],
  timeline_variables: test_stimuli,
  repetitions: 10,
  randomize_order: true
}
timeline.push(test_procedure_block2);

var calculating2 = {
  type: "html-keyboard-response",
  stimulus: 'Calculating your points...',
  choices: jsPsych.NO_KEYS,
  trial_duration: 1000,
};
timeline.push(calculating2);

var block_2_score = {
  type: "html-keyboard-response",
  stimulus: `
    <p>Your cumulative points is now <strong> 26 </strong> </p>
    <p>Sorry, but you do not get the cash reward.</p>
    <p>Please do not close this window</p> 
  `,
  choices: jsPsych.NO_KEYS,
  post_trial_gap: 2000,
};
timeline.push(block_2_score);

