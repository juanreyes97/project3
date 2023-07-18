// Initializes the page with a default plot
function init() {
    d3.json('http://127.0.0.1:5000/chart-api').then(d=>{
    let trace1={
        x:d.ngbh,
        y:d.avg,
        mode: 'lines+markers',
        type:'scatter'
    }
    
    let data = [trace1]

    let layout = {
        title: 'Average price by neighbourhood',
        showlegend: false
    };
    
    Plotly.newPlot('plot', data, layout)
    })
  }
  
  // Call updatePlotly() when a change takes place to the DOM
  d3.selectAll("#selDataset").on("change", updatePlotly);
  
  // This function is called when a dropdown menu item is selected
  function updatePlotly() {
    // Use D3 to select the dropdown menu
    let dropdownMenu = d3.select("#selDataset");
    // Assign the value of the dropdown menu option to a variable
    let dataset = dropdownMenu.property("value");
  
    // Initialize x and y arrays
    let x = [];
    let y = [];
  
    if (dataset === 'dataset1') {
        d3.json('http://127.0.0.1:5000/chart-api').then(d=>{
            let trace1={
                x:d.ngbh,
                y:d.avg,
                mode: 'lines+markers',
                type:'scatter'
            }
            
            let data = [trace1]

            let layout = {
                title: 'Average price by neighbourhood',
                showlegend: false
            };
            
            Plotly.newPlot('plot', data, layout)
            })
    }
  
    else if (dataset === 'dataset2') {
        d3.json('http://127.0.0.1:5000/chart-api').then(d=>{
            let trace2={
                x:d.review,
                y:d.airname,
                type:'bar',
                orientation: 'h',
            }
            
            let data = [trace2]

            let layout = {
                title: 'The most reviewed',
                showlegend: false,
                margin: {
                    l: 350,
                    r: 50,
                    b: 50,
                    t: 100
                }
            };
            
            Plotly.newPlot('plot', data, layout)
            })
    }

    // Note the extra brackets around 'x' and 'y'
    Plotly.restyle("plot", "x", [x]);
    Plotly.restyle("plot", "y", [y]);
  }
  
  init();
