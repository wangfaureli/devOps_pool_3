defmodule Theme01.Account.User do
  use Ecto.Schema
  import Ecto.Changeset
  alias Theme01.Account.{User, Encryption}

  schema "users" do
    field :email, :string
    field :username, :string
    field :encrypted_password, :string
    # field :type, :string

    # VIRTUAL FIELDS
    field :password, :string, virtual: true
    field :password_confirmation, :string, virtual: true

    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:username, :email, :password])
    |> validate_length(:password, min: 6)
    |> validate_confirmation(:password)
    |> unique_constraint(:username)
    |> downcase_username
    |> encrypt_password
    |> validate_required([:username, :email])
    |> validate_format(:email, ~r/.+@.+\..+/, [message: "Please input a valid email"])
    # |> validate_inclusion(:type, "admin", "user", "manager")
  end

   defp encrypt_password(changeset) do
    password = get_change(changeset, :password)
    if password do
      encrypted_password = Encryption.hash_password(password)
      put_change(changeset, :encrypted_password, encrypted_password)
    else
      changeset
    end
  end

  defp downcase_username(changeset) do
    update_change(changeset, :username, &String.downcase/1)
  end
end