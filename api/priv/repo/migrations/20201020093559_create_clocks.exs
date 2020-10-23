defmodule Theme01.Repo.Migrations.CreateClocks do
  use Ecto.Migration

  def change do
    create table(:clocks) do
      add :time, :utc_datetime, null: false
      add :status, :boolean, default: true, null: false
      add :user_id, references(:users, on_delete: :nothing), null: false
      
      timestamps()
    end

    create index(:clocks, [:user_id])
  end
end
