defmodule Theme01Web.WorkingTimeView do
  use Theme01Web, :view
  alias Theme01Web.WorkingTimeView

  def render("index.json", %{workingtimes: workingtimes}) do
    %{data: render_many(workingtimes, WorkingTimeView, "working_time.json")}
  end

  def render("show.json", %{working_time: working_time}) do
    %{data: render_one(working_time, WorkingTimeView, "working_time.json")}
  end

  def render("working_time.json", %{working_time: working_time}) do
    %{id: working_time.id,
      start: Theme01.WorkingTimes.get_time(working_time.start),
      end: Theme01.WorkingTimes.get_time(working_time.end),
      user_id: working_time.user_id}
  end
end
