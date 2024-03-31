from flask import Flask, Blueprint, request, g

data_bp = Blueprint("data_blueprint", __name__)


@data_bp.route("/instruction", methods=["POST"])
def create_instruction():
  return "create instruction"