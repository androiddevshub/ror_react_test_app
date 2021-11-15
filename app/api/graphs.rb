class Graphs < Api

  namespace :graphs, desc: "Graph Related Operations" do
    
    get "/" do
      graphs = Graph.all
      options = graphs.collect(&:month)
      series = graphs.collect(&:value)
      { status: true, data: graphs, options: options, series: series }
    end

    get "/:id" do
      graph = Graph.find_by(id: params[:id]);
      if graph
        { status: true, data: graph, message: "Graph data" }
      else
        error!({status: false, message: "Graph not found"})
      end
    end

    post "/" do
      graph = Graph.create(month: params[:month], value: params[:value]);
      if graph
        { status: true, data: graph, 
        message: "Graph added" }
      else
        error!({status: false, message: "Something went wrong"})
      end

    end

    put "/:id" do
      graph = Graph.find_by(id: params[:id])
      if graph
        if graph.update(month: params[:month], value: params[:value])
          { status: true, data: graph, message: "Graph updated" }
        end
      else
        error!({status: false, message: "Graph data not found"})
      end
    end
    
    delete "/:id" do
       graph = Graph.find_by(id: params[:id])
      if graph && graph.delete
        { status: true, data: graph, message: "Graph deleted" }
      else
        error!({status: false, message: "Graph not found"})
      end
    end


  end
end
