# # # get variable FROM docker-compose
# # ARG ELIXIR_VERSION

# # base image elixer to start with
# FROM elixir:latest

# # install hex package manager
# RUN mix local.hex --force

# # install the latest phoenix 
# RUN mix archive.install hex phx_new 1.5.6

# # create app folder
# RUN mkdir /app
# COPY . /app
# WORKDIR /app

# # install dependencies
# RUN mix deps.get

# # run phoenix in *dev* mode on port 4000
# EXPOSE 4000

# CMD ["mix", "phx.server"]

FROM bitwalker/alpine-elixir-phoenix:latest
WORKDIR /app
#COPY mix.exs .
COPY . .
RUN mkdir assets
#RUN
#COPY assets/package.json assets
#COPY assets/package-lock.json assets
#CMD cd assets && npm install && cd .. && mix phx.server

CMD mix deps.get && mix ecto.create && mix ecto.migrate && mix phx.server