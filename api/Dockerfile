FROM bitwalker/alpine-elixir-phoenix:latest

# Create an app directory to store our files in
ADD . /app
# Set working directory as app
WORKDIR /app

# Install Elxir dependencies
RUN mix deps.get

RUN mix compile
EXPOSE 4000
CMD mix clean && mix ecto.migrate && mix phx.server

# FROM bitwalker/alpine-elixir-phoenix:latest
# #COPY mix.exs .
# # COPY . .

# ENV APP_HOME /app
# RUN mkdir -p $APP_HOME
# # COPY mix.exs $APP_HOME
# # COPY mix.lock $APP_HOME
# COPY . $APP_HOME
# WORKDIR $APP_HOME

# # Install hex package manager
# # By using --force, we don’t need to type “Y” to confirm the installation
# RUN mix local.hex --force

# #RUN
# #COPY assets/package.json assets
# #COPY assets/package-lock.json assets
# #CMD cd assets && npm install && cd .. && mix phx.server

# # Compile the project
# CMD mix deps.get && mix ecto.migrate && mix phx.server