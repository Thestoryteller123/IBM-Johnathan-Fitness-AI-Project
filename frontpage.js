function showForm(formId){
    document.querySelectorAll(".form-box").forEach(form => form.classList.remove("active"));
    document.getElementById(formId).classList.add("active");

    // // Basically we have 2 classes labelled as "form-box", the 2 form boxes 
    // If it's already active, a.k.a visible, then the first line removes that active trait, making it invisible
    // The second line adds the visible trait to the other one

}