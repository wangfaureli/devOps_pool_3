FROM elixir:1.10

# Create an app directory to store our files in
ADD . /app
# Set working directory as app
WORKDIR /app

RUN mix local.hex --force
RUN mix local.rebar --force

RUN mix deps.clean --all
# Install Elxir dependencies
RUN mix deps.get


CMD mix ecto.reset && mix ecto.setup && mix ecto.migrate && mix phx.server

