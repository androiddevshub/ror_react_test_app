class Users < Api

  namespace :tests, desc: "User Related Operations" do
    
    get "/" do
      { status: true, data: User.all, 
       }
    end

    get "/:id" do
      user = User.find_by(id: params[:id]);
      if user
        { status: true, data: user, message: "User date" }
      else
        error!({status: false, message: "User not found"})
      end
    end

    post "/" do
      user = User.create(name: params[:name], email: params[:email]);
      if user
        { status: true, data: user, 
        message: "User added" }
      else
        error!({status: false, message: "Something went wrong"})
      end

    end

    put "/:id" do
      user = User.find_by(id: params[:id])
      if user
        if user.update(name: params[:name])
          { status: true, data: user, message: "User updated" }
        end
      else
        error!({status: false, message: "User not found"})
      end
    end
    
    delete "/:id" do
       user = User.find_by(id: params[:id])
      if user && user.delete
        { status: true, data: user, message: "User deleted" }
      else
        error!({status: false, message: "User not found"})
      end
    end


  end
end
