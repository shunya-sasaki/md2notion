{
  description = "Node.js development environment";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs =
    {
      nixpkgs,
      flake-utils,
      ...
    }:
    flake-utils.lib.eachDefaultSystem (
      system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
        nodeVersion = pkgs.nodejs_25;
      in
      {
        devShells.default =
          with pkgs;
          mkShell {
            packages = [
              nodeVersion
              pkgs.yarn
              pkgs.pnpm
            ];
            shellHook = ''
              echo "Node.js ${nodeVersion.version} environment"
            '';
          };
      }
    );
}
