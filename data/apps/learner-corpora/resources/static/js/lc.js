
var enableDict = {
    // 'corpus_availability': {
    //     'restricted': [],
    // },
};

function enableInput(e) {
    var that = $(e.target);
    var name = that.parent().parent().attr("data-name");
    var val = that.val();
    var enable = enableDict[name][val];
    console.log("MENZO: element["+name+"]["+val+"] enable ["+enable+"]");
    if (enable) {
        enable.forEach(function(v,i,a) {
            $("#"+v).attr("disabled", false);
            console.log("MENZO: enabled ["+v+"]");
        });
    }
    // for other values disable the dependants
    var disable = enableDict[name];
    console.log(disable);
    console.log(Object.keys(disable));
    for(var prop in disable) {
        console.log("MENZO: disable["+prop+"]");
    }
    console.log("MENZO: disable["+Object.keys(disable).length+"]");
    Object.keys(disable).forEach(function(k,i) {
        console.log("MENZO: disable["+k+"]["+i+"]");
        if (k!=val) {
            disable[k].forEach(function(v,i,a) {
                $("#"+v).attr("disabled", true);
                console.log ("MENZO: disabled ["+v+"]");
            });
        };
    });
};

function dependsOn(cur, on, val) {
    $("#ccform").find("[data-name='"+cur+"']").each(function () {
        var that = $(this);
        // get control, get child
        var c = that.children("[class='control']");
        var i = c.children("[class='input_element']");
        i.attr("disabled", true);
        var cur_id = i.attr("id");
        var p = that.prev();
        while (p && p.attr('data-name')!=on) {
            p = p.prev();
        }
        if (p) {
            c = p.children("[class='control']");
            i = c.children("[class='input_element']");
            console.log("MENZO: look for on["+on+"]");
            if (!Object.hasOwn(enableDict, on)) {
                Object.defineProperty(enableDict, on, {value:{},writable:true,enumerable:true,configurable:true});
                console.log(enableDict);
            }
            if (!Object.hasOwn(enableDict[on], val)) {
                Object.defineProperty(enableDict[on], val, {value : [],writable:true,enumerable:true,configurable:true});
                console.log(enableDict);
            }
            enableDict[on][val].push(cur_id);
            i.on('change',function(e) {
                enableInput(e);
            });
            var on_id = i.attr("id");
            console.log ("MENZO: "+cur+"["+cur_id+"]depends on "+on+"["+on_id+"]["+getInputType(i)+"]");
        }
    });
    console.log(enableDict);

};

function getInputType(element) {
    if (element.is("input")) {
        return "input";
    } else {
        if (element.is('textarea')) {
            return "textarea";
        } else {
            if (element.is("select")) {
                return "select";
            } else {
                return "onbekend";
            }
        }
    }
}

function initLC(page) {
    alert("welcome to LC editor!");

     dependsOn('corpus_access_requirements', 'corpus_availability', 'restricted');
/*
corpus_access_requirements, corpus_availability='restricted'
corpus_transcription_guidelines, corpus_transcription='true'
corpus_single_or_multi_author, corpus_mode='written'
corpus_text_versioning, corpus_mode='written'
corpus_language_testing_setting, corpus_production_setting='official_language_testing'
corpus_proficiency_assignment_method, corpus_proficiency_assignment_available='true'
corpus_learner_proficiency_assignment_method, corpus_proficiency_assignment_method='learner-centred method'
corpus_learner_proficiency_assignment_instrument, corpus_learner_proficiency_assignment_method='independent instrument' OR 'total test score'
corpus_learner_proficiency_documentation, corpus_proficiency_assignment_method='learner-centred method'
corpus_text_proficiency_assignment_method, corpus_proficiency_assignment_method='text-centred method'
corpus_text_proficiency_assignment_instrument, corpus_proficiency_assignment_method='text-centred method'
corpus_text_proficiency_documentation, corpus_proficiency_assignment_method='text-centred method'
text_version, corpus_text_versioning='true'
text_proficiency, proficiency_assignment_method='text-centred'
text_official_language_testing_score, data_production_setting='language testing setting'
learner_impairment_details, learner_impairment='true'
learner_atypical_learning_details, learner_atypical_learning='true'
learner_target_language_immersive_instruction, learner_target_language_instructed = 'true'
learner_target_language_proficiency, corpus_proficiency_assignment_method='learner-centred'
learner_target_language_proficiency_CEFR_conversion, corpus_proficiency_assignment_method='learner-centred'
learner_target_language_official_language_testing_score, corpus_production_setting='official language testing'
learner_motivation, corpus_motivation_test
learner_attitude, corpus_motivation_test
situation_participants_addressee_type, situation_participants_addressee_type='plural' OR 'un-enumerated'

*/

}