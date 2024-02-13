local plugins = {
    {
        --Linter
        "dense-analysis/ale"
    },
    {
        --VimTex
        "lervag/vimtex",
        event = "BufEnter",
    },
    {
        --Snippet Manager.
        "L3MON4D3/LuaSnip",
        -- follow latest release.
        version = "2.*", -- Replace <CurrentMajor> by the latest released major
        -- install jsregexp (optional!).
        build = "make install_jsregexp"
    },
    {
        -- Snippets
        "garbas/vim-snipmate",
        require("luasnip.loaders.from_snipmate").lazy_load({paths = "~/.config/nvim/snippets"})
    },
    {
        -- Competetive Programming.
        "xeluxee/competitest.nvim",
        dependencies = "MunifTanjim/nui.nvim",
        lazy = false,
        -- event = "BufEnter",
        config = function()
            require("competitest").setup({
                runner_ui = {
                    interface = "split",
                },
                compile_command = {
                    cpp = { exec = "g++", args = { "-Wall", "-DLEET" ,"$(FNAME)", "-o", "$(FNOEXT)" } },
                },
            })
        end,
    },
    {
        -- GPT integration
        "jackMort/ChatGPT.nvim",
        lazy=false,

        config = function()
            require("chatgpt").setup()
        end,
        dependencies = {
            "MunifTanjim/nui.nvim",
            "nvim-lua/plenary.nvim",
            "nvim-telescope/telescope.nvim"
        }
    },
    {
        -- Conquer Of Complettion
        "neoclide/coc.nvim",
        branch = "release",
        lazy = false
    },
    {
        -- Code Folder
        "anuvyklack/pretty-fold.nvim",
        config = function()
            require('pretty-fold').setup {
               custom_function_arg = 'Hello from inside custom function!',
               sections = {
                  left = {
                     function(config)
                        return config.custom_function_arg
                     end
                  },
               }
            }
        end,
    },
    {
        -- Menu Manager
        "gelguy/wilder.nvim",
        lazy = false
    },
    {
      "neovim/nvim-lspconfig",

       dependencies = {
         "jose-elias-alvarez/null-ls.nvim",
         config = function()
           require "custom.configs.null-ls"
         end,
       },
       config = function()
          require "plugins.configs.lspconfig"
          require "custom.configs.lspconfig"
       end,
    },
    {
        -- Markdown
        "iamcco/markdown-preview.nvim",
        lazy=false,
        run = function() vim.fn["mkdp#util#install"]() end
    },
    {
        "Exafunction/codeium.vim",
        event = 'BufEnter',
        config = function()
            require "custom.configs.codeium"
        end
    },
    {
        "ianding1/leetcode.vim",
        lazy = false,
    },
    {
        "kiyoon/jupynium.nvim",
        build = "pip3 install --user .",
        event = 'BufEnter',
        config = function ()
            require "custom.configs.jupynium"
        end
        -- build = "conda run --no-capture-output -n jupynium pip install .",
        -- enabled = vim.fn.isdirectory(vim.fn.expand "~/miniconda3/envs/jupynium"),
    },
    "rcarriga/nvim-notify",   -- optional
    "stevearc/dressing.nvim", -- optional, UI for :JupyniumKernelSelect
}
return plugins
